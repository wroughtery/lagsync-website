import type { APIRoute } from 'astro';

const SITE = 'https://lagsync.com';

const items = [
  {
    title: 'LagSync 1.4.0 Released',
    link: `${SITE}/releases#v140`,
    pubDate: 'Sun, 16 Aug 2026 00:00:00 GMT',
    description:
      'Live on Chrome and Edge. Send a bug report from inside LagSync with a full payload preview — hostname only, never the full address. Anonymous by default, optional email only if you want a reply. Everything else still runs 100% on-device.'
  },
  {
    title: 'LagSync 1.3.1 Released',
    link: `${SITE}/releases#v131`,
    pubDate: 'Sat, 15 Aug 2026 00:00:00 GMT',
    description:
      'Fix (Chrome, Edge): rare freeze or backward jump on YouTube and Vimeo at delay-change discontinuities. Discontinuities are now crossed pre-emptively, recovery stays armed after the delay is switched off, and a watchdog restarts the decoder if playback wedges. Verified across 40+ stress cycles.'
  },
  {
    title: 'LagSync 1.3.0 Released',
    link: `${SITE}/releases#v130`,
    pubDate: 'Wed, 05 Aug 2026 00:00:00 GMT',
    description:
      'Per-site permissions: ships with access to 19 video sites instead of every website, with a new Site access section in Settings. YouTube freeze fix, no more quality/frame-rate drops on YouTube and Vimeo, frame-capture routing and memory fixes, and near-zero overhead when switched off.'
  },
  {
    title: 'LagSync 1.2.2 Released',
    link: `${SITE}/releases#v122`,
    pubDate: 'Thu, 28 May 2026 00:00:00 GMT',
    description:
      'Safari: Netflix now works (MSE path) and Twitch delay applies mid-stream without reload. Prime Video is no longer supported on Safari (FairPlay native HLS). Donation prompt surfaces more prominently as usage accumulates, still 100% on-device.'
  },
  {
    title: 'LagSync 1.2.1 Released',
    link: `${SITE}/releases#v121`,
    pubDate: 'Tue, 28 Apr 2026 00:00:00 GMT',
    description:
      'Privacy toggle to pause/delete local usage stats, Edge support fixes (page_script injection, Twitch canvas pipeline), Prime Video Instant single-jump, Twitch startup fix, YouTube no-DVR live support, popup 0 ms on toggle-off, and new docs.'
  },
  {
    title: 'LagSync 1.01 Released',
    link: `${SITE}/releases#v101`,
    pubDate: 'Mon, 06 Apr 2026 00:00:00 GMT',
    description:
      'Fixes and improvements: Twitch/HUD visibility, capability-based pipeline selection, Firefox Kick compatibility, canvas stability, TypeScript refactor, and Prime Video compatibility.'
  },
  {
    title: 'LagSync 1.0 Released',
    link: `${SITE}/releases#v10`,
    pubDate: 'Fri, 03 Apr 2026 00:00:00 GMT',
    description: 'Initial release with core lag sync features via MSE and offset controls.'
  }
];

export const GET: APIRoute = () => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<rss version="2.0">\n` +
    `<channel>\n` +
    `  <title>LagSync Releases</title>\n` +
    `  <link>${SITE}/releases</link>\n` +
    `  <description>Release and changelog updates for LagSync.</description>\n` +
    `  <language>en-us</language>\n` +
      `  <lastBuildDate>Sun, 16 Aug 2026 00:00:00 GMT</lastBuildDate>\n` +
    items
      .map(
        (item) =>
          `  <item><title>${item.title}</title><link>${item.link}</link><guid>${item.link}</guid><pubDate>${item.pubDate}</pubDate><description>${item.description}</description></item>`
      )
      .join('\n') +
    `\n</channel>\n` +
    `</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8'
    }
  });
};
