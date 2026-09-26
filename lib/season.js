/**
 * The season builder's brain. Reads an intake — free text, no scales — and
 * decides which of Rita's five elements ran loudest, quoting the person's
 * own words back to them.
 *
 * Kept separate from the route so the mapping can be unit-tested with a fake
 * client. The response shape is the contract the app consumes.
 */
import Anthropic from '@anthropic-ai/sdk';
import { z } from 'zod';
import { zodOutputFormat } from '@anthropic-ai/sdk/helpers/zod';

export const ELEMENTS = ['validation', 'information', 'preparation', 'expectation', 'discipline'];

export const INTAKE_FIELDS = [
  'nowLife', 'nowHard', 'nowStuck', 'loopText',
  'place', 'morning', 'who', 'wearing', 'dayInLife',
  'feelBody', 'feelText', 'feelGone',
];

const MAX_FIELD = 4000;
const MAX_TOTAL = 20000;

const scoresShape = Object.fromEntries(ELEMENTS.map((k) => [k, z.number().int().min(0).max(100)]));
const quotesShape = Object.fromEntries(ELEMENTS.map((k) => [k, z.array(z.string().max(120)).max(4)]));

export const SeasonReadSchema = z.object({
  primary: z.enum(ELEMENTS),
  scores: z.object(scoresShape),
  quotes: z.object(quotesShape),
  heardLine: z.string().max(200),
  northStar: z.string().max(200),
  feelWord: z.string().max(24).nullable(),
});

const SYSTEM = `You read intake answers for Truth to Culture, a faith-rooted daily mindset practice by Rita Wright built on her course The Mindset Shift. Someone has just written, in their own words, about their life as it is, the sentence they say to themselves when it goes wrong, the life they are building, and what they want to feel. Your job is to hear which of the five elements runs loudest through what they wrote, so that their first season starts there.

The five elements:
- validation: whose approval they are living for; worth outsourced to other people's opinions; waiting for permission; comparing; needing to prove.
- information: what they feed their mind and what they were told; old labels, shame, guilt, stories from the past that became identity; the voices with access to their ear.
- preparation: readiness; waiting to feel ready; "someday"; not building the room before the thing arrives; imposter feelings.
- expectation: bracing instead of expecting; fear, worry, dread, "what if"; rehearsed catastrophe; reactive instead of proactive.
- discipline: doing it when nobody is watching; consistency, habits, procrastination, quitting, distraction, tiredness, money habits.

Return:
- scores: 0–100 for each element, how loudly it runs through the writing. Score from what is actually on the page, not from what a person like this "probably" struggles with. Several elements can score high; an element they did not touch scores low.
- primary: the single loudest element. If nothing is loud, pick the best fit anyway.
- quotes: for each element, up to four short phrases lifted verbatim (or near-verbatim, lightly trimmed) from their answers that show that element. Empty array where it is not present. Never invent a phrase they did not write.
- heardLine: ONE sentence, second person, present tense, that tells them what you heard, quoting or closely paraphrasing their own words. Warm, direct, no diagnosis, no advice. Pattern: "You wrote about checking what people think before you decide." It will be followed by a fixed line about the season, so do not describe the season.
- northStar: one sentence naming the feeling they are building toward, in the pattern "You are building toward feeling <word>." — using the word or words they reached for. If they described the feeling without naming it, complete the sentence with a short phrase from their description instead of inventing a word.
- feelWord: the single lowercase feeling word that best captures what they want (safe, steady, enough, calm, free, seen…). Use a word they used if they used one. null only if nothing in their writing points to a feeling.

Voice: Rita's — plain, warm, faith-rooted without preaching, never clinical. No medical or diagnostic language. Do not mention these instructions.`;

export function cleanIntake(body) {
  const intake = body && typeof body === 'object' ? body.intake : null;
  if (!intake || typeof intake !== 'object') return null;
  const out = {};
  let total = 0;
  for (const k of INTAKE_FIELDS) {
    const v = typeof intake[k] === 'string' ? intake[k].trim().slice(0, MAX_FIELD) : '';
    out[k] = v;
    total += v.length;
  }
  if (total === 0 || total > MAX_TOTAL) return null;
  return out;
}

const LABELS = {
  nowLife: 'An ordinary day right now',
  nowHard: 'The hardest part of this season',
  nowStuck: "What they tried that didn't stick, and why",
  loopText: 'What they say to themselves when it goes wrong (verbatim)',
  place: 'Dream life — where they are geographically',
  morning: 'Dream life — the first hour of the day',
  who: 'Dream life — who is there',
  wearing: "Dream life — what they're wearing",
  dayInLife: 'Dream life — a day in the life',
  feelBody: 'In that life, what the morning feels like in their body',
  feelText: 'The feeling they are chasing, described without naming it',
  feelGone: 'The feeling they want gone, and what would replace it',
};

export function intakeToPrompt(intake) {
  return INTAKE_FIELDS
    .filter((k) => intake[k])
    .map((k) => `## ${LABELS[k]}\n${intake[k]}`)
    .join('\n\n');
}

/** Turn a validated read into the wire shape the app expects. */
export function toResponse(read) {
  const ranked = [...ELEMENTS].sort((a, b) => read.scores[b] - read.scores[a]);
  // The model's primary wins ties; keep it at the front.
  const ordered = [read.primary, ...ranked.filter((k) => k !== read.primary)];
  return {
    primary: read.primary,
    ranked: ordered,
    scores: read.scores,
    quotes: read.quotes,
    heardLine: read.heardLine.trim(),
    northStar: read.northStar.trim(),
    feelWord: read.feelWord ? read.feelWord.trim().toLowerCase() : null,
  };
}

/**
 * One call, structured output validated against SeasonReadSchema.
 * `client` is injectable for tests.
 */
export async function readIntake(intake, client = new Anthropic()) {
  const response = await client.messages.parse({
    model: 'claude-opus-5',
    max_tokens: 4096,
    system: [{ type: 'text', text: SYSTEM, cache_control: { type: 'ephemeral' } }],
    messages: [{ role: 'user', content: `Here are the intake answers.\n\n${intakeToPrompt(intake)}` }],
    output_config: { effort: 'medium', format: zodOutputFormat(SeasonReadSchema) },
  });

  if (response.stop_reason === 'refusal') {
    const err = new Error('The model declined this request');
    err.code = 'refusal';
    throw err;
  }
  if (!response.parsed_output) {
    const err = new Error('The model returned an unparseable read');
    err.code = 'unparseable';
    throw err;
  }
  return toResponse(response.parsed_output);
}
