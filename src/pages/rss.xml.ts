import type { APIRoute } from 'astro';

const SITE = 'https://lagsync.com';

const items = [
  {
    title: 'LagSync 1.3.0 Released',
    link: `${SITE}/releases#v130`,
    pubDate: 'Wed, 05 Aug 2026 00:00:00 GMT',
    description:
      'Live now on Firefox (other stores rolling out): access is now limited to 19 video sites instead of all websites, with opt-in per site elsewhere. Fixes a YouTube freeze, a Firefox frame-rate/quality drop on YouTube and Vimeo, and a Firefox Twitch live-delay regression.'
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
      `  <lastBuildDate>Wed, 05 Aug 2026 00:00:00 GMT</lastBuildDate>\n` +
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
