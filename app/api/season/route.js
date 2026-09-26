import Anthropic from '@anthropic-ai/sdk';
import { cleanIntake, readIntake } from '../../../lib/season';

/**
 * POST /api/season — reads an intake and returns which element runs loudest.
 * Called by the Truth to Culture app; the API key never leaves this server.
 * The app falls back to its on-device keyword pass if this is unreachable.
 */
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'content-type, x-ttc-token',
};

const json = (body, status = 200) => Response.json(body, { status, headers: CORS });

export function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS });
}

export async function POST(request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return json({ error: 'Season builder is not configured' }, 503);
  }

  // A shared app token keeps casual abuse off the endpoint. It's not a secret
  // in the strict sense (it ships in the app), so it's optional and cheap.
  const expected = process.env.SEASON_API_TOKEN;
  if (expected && request.headers.get('x-ttc-token') !== expected) {
    return json({ error: 'Unauthorized' }, 401);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Body must be JSON' }, 400);
  }

  const intake = cleanIntake(body);
  if (!intake) return json({ error: 'Missing or oversized intake' }, 400);

  try {
    const read = await readIntake(intake);
    return json(read);
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) {
      return json({ error: 'Busy — try again in a moment' }, 429);
    }
    if (error instanceof Anthropic.AuthenticationError) {
      console.error('[season] invalid ANTHROPIC_API_KEY');
      return json({ error: 'Season builder is misconfigured' }, 503);
    }
    if (error instanceof Anthropic.APIError) {
      console.error(`[season] API error ${error.status}: ${error.message}`);
      return json({ error: 'The season builder is unavailable' }, 502);
    }
    console.error(`[season] ${error.code || 'error'}: ${error.message}`);
    return json({ error: 'Could not read this intake' }, 502);
  }
}
