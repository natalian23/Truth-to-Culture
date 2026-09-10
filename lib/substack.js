/**
 * Rita's Substack is the CMS for the Reading Room: she publishes there, the
 * site picks it up. Fetched at build and revalidated daily.
 */

export const SUBSTACK_URL = 'https://connected565.substack.com';
export const FEED_URL = process.env.SUBSTACK_FEED_URL || `${SUBSTACK_URL}/feed`;
export const REVALIDATE_SECONDS = 86400; // daily

/** Shown when the feed can't be reached at build time, so the page never breaks. */
const FALLBACK_ESSAYS = [
  {
    title: 'You See Someone Doing Something Miraculous?',
    link: `${SUBSTACK_URL}/p/you-see-someone-doing-something-miraculous`,
    dek: '“Join them.” From the archive. Read the full essay on Substack.',
    dateLabel: 'SEP 2024 · ESSAY',
  },
  {
    title: 'The frame changes. The picture doesn’t.',
    link: SUBSTACK_URL,
    dek: 'From the archive. Read the full essay on Substack.',
    dateLabel: 'ESSAY',
  },
  {
    title: 'Nesting for the blessing',
    link: SUBSTACK_URL,
    dek: 'From the archive. Read the full essay on Substack.',
    dateLabel: 'ESSAY',
  },
  {
    title: 'Who has your ear?',
    link: SUBSTACK_URL,
    dek: 'From the archive. Read the full essay on Substack.',
    dateLabel: 'ESSAY',
  },
];

const NAMED_ENTITIES = {
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
  amp: '&',
};

/**
 * Decode the entities Substack leaves inside CDATA (mostly numeric ones such
 * as &#8217;). Ampersand is resolved last so &amp;#8217; survives correctly.
 */
const unescapeXml = (input) =>
  input
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)))
    .replace(/&(lt|gt|quot|apos|nbsp);/g, (_, name) => NAMED_ENTITIES[name])
    .replace(/&amp;/g, '&');

/** Pull one tag's text out of an RSS <item>, CDATA-wrapped or not. */
function tag(itemXml, name) {
  const match = itemXml.match(
    new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`, 'i')
  );
  if (!match) return '';
  const raw = match[1].trim();
  const cdata = raw.match(/^<!\[CDATA\[([\s\S]*?)\]\]>$/);
  return unescapeXml((cdata ? cdata[1] : raw).trim());
}

const stripHtml = (html) =>
  html
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

function truncate(text, max = 150) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return `${cut.slice(0, lastSpace > 60 ? lastSpace : max).trimEnd()}…`;
}

function formatDate(pubDate) {
  const d = new Date(pubDate);
  if (Number.isNaN(d.getTime())) return 'ESSAY';
  const label = d
    .toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' })
    .toUpperCase();
  return `${label} · ESSAY`;
}

function parseFeed(xml, limit) {
  const items = xml.match(/<item\b[\s\S]*?<\/item>/gi) || [];

  return items
    .slice(0, limit)
    .map((item) => {
      const title = tag(item, 'title');
      const link = tag(item, 'link');
      if (!title || !link) return null;

      const description = tag(item, 'description') || tag(item, 'content:encoded');

      return {
        title,
        link,
        dek: truncate(stripHtml(description)) || 'Read the full essay on Substack.',
        dateLabel: formatDate(tag(item, 'pubDate')),
      };
    })
    .filter(Boolean);
}

/**
 * Latest essays from the feed. Falls back to the archive placeholders if the
 * feed is unreachable or empty, so a bad build never ships an empty room.
 */
export async function getEssays(limit = 6) {
  try {
    const res = await fetch(FEED_URL, {
      headers: { 'user-agent': 'truthtoculture.com (+build)' },
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!res.ok) throw new Error(`Substack feed responded ${res.status}`);

    const essays = parseFeed(await res.text(), limit);
    if (!essays.length) throw new Error('Substack feed had no items');

    return { essays, source: 'substack' };
  } catch (error) {
    console.warn(`[reading-room] falling back to placeholders: ${error.message}`);
    return { essays: FALLBACK_ESSAYS.slice(0, limit), source: 'fallback' };
  }
}
