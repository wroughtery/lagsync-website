/**
 * Cross-store user count, fetched AT BUILD TIME (static site — this runs in
 * the Astro build, never in the visitor's browser). Each store exposes a
 * different metric (Chrome: weekly users, Edge: active installs, Firefox:
 * average daily users); the sum is a conservative "users" figure because the
 * Chrome number alone is a floor ("2,000 users" means >= 2,000). Safari is
 * omitted because Apple publishes no install count at all (checked via the
 * iTunes lookup API, 2026-08-17) — the displayed total is therefore an
 * undercount, which is the safe direction.
 *
 * Every fetch has a hardcoded fallback (last manually-verified 2026-08-17)
 * so an API hiccup can never break the build or inflate the number.
 */

const FALLBACKS = { chrome: 2000, edge: 254, firefox: 142 };

async function chromeUsers(): Promise<number> {
  try {
    const res = await fetch(
      'https://chromewebstore.google.com/detail/lagsync-bluetooth-audio-f/ijhhkocgkagcfkoinilkjdcadljdjmaf',
      { headers: { 'accept-language': 'en' } },
    );
    const html = await res.text();
    const m = html.match(/([\d][\d., \s]*)\s*\+?\s*users/i);
    if (m) {
      const n = parseInt(m[1].replace(/[^\d]/g, ''), 10);
      if (n > 0 && n < 10_000_000) return n;
    }
  } catch { /* fall through */ }
  return FALLBACKS.chrome;
}

async function edgeUsers(): Promise<number> {
  try {
    const res = await fetch(
      'https://microsoftedge.microsoft.com/addons/getproductdetailsbycrxid/ocigopodjjobggdnklngfaceeedlkbol',
      { headers: { accept: 'application/json' } },
    );
    const d = await res.json();
    const n = Number(d?.activeInstallCount);
    if (Number.isFinite(n) && n > 0) return n;
  } catch { /* fall through */ }
  return FALLBACKS.edge;
}

async function firefoxUsers(): Promise<number> {
  try {
    const res = await fetch('https://addons.mozilla.org/api/v5/addons/addon/lagsync-bluetooth-audio-fix/');
    const d = await res.json();
    const n = Number(d?.average_daily_users);
    if (Number.isFinite(n) && n > 0) return n;
  } catch { /* fall through */ }
  return FALLBACKS.firefox;
}

const [chrome, edge, firefox] = await Promise.all([chromeUsers(), edgeUsers(), firefoxUsers()]);
const total = chrome + edge + firefox;

/** Total across stores, rounded DOWN to the nearest 100 — display as "N+". */
export const USER_COUNT_FLOOR = Math.floor(total / 100) * 100;
/** e.g. "2,400+" */
export const USER_COUNT_LABEL = `${USER_COUNT_FLOOR.toLocaleString('en-US')}+`;

console.log(`[userCount] chrome=${chrome} edge=${edge} firefox=${firefox} -> ${USER_COUNT_LABEL} users`);
