# Festival of Ideas Delhi website

Next.js website for Festival of Ideas Delhi. The canonical production origin is
`https://www.festivalofideas.org`; the apex domain redirects there in Vercel.

## Sitemap and indexing

`app/sitemap.js` generates `/sitemap.xml` from the static pages in `lib/seo.js`,
published speakers, programmes and unique About sections. New entries in these
data sources appear in the sitemap on the next deployment. The current sitemap
contains 64 canonical pages.

`app/robots.js` allows public pages, excludes `/api/` from crawling and advertises
the sitemap. Each page has a canonical URL and its own title and description.
The default SRCC About section canonicalises to `/about` because both routes
render the same content. Query variants of `/speakers` canonicalise to `/speakers`.

The expected-speaker tab is currently a placeholder. Its profiles and tab are
marked `noindex` and excluded from the sitemap. When the expected line-up is
announced and displayed, update `publishedSpeakers` in `data/speakers.js`, the
speaker listing and its metadata together. Vercel preview/development deployments
are also marked `noindex`, block crawling and have an empty sitemap.

The sitemap deliberately omits `lastmod`: add it only when reliable content
modification dates exist, rather than using the time of a build or request.

The homepage includes `WebSite` and `Organization` structured data with the
festival's name, canonical website, logo and official social profiles. This
helps identify the Delhi festival; it does not guarantee a ranking or exclusive
search results for the shared phrase “Festival of Ideas”.

## Verification

If HTML verification is needed, set `GOOGLE_SITE_VERIFICATION` or
`BING_SITE_VERIFICATION` in the hosting environment to the provider's verification
token, then redeploy. These are the token values, not the entire meta tags.
Existing DNS verification does not need either variable.

## Validate and submit

1. Run `npm run build`, then `npm run start -- --port 4181`.
2. Run `npm run check:indexing` in another terminal. This checks every sitemap
   page's HTTP status, canonical and robots tags, plus query variants, invalid
   routes and the legacy home redirect.
3. Deploy and run `npm run check:indexing -- https://www.festivalofideas.org`.
4. In the verified `festivalofideas.org` Google Search Console domain property,
   open **Indexing → Sitemaps** and submit
   `https://www.festivalofideas.org/sitemap.xml`.
5. Use **URL inspection** for `https://www.festivalofideas.org/`, run **Test live
   URL**, then **Request indexing** if needed. Repeat for key pages such as
   `/programmes` and `/attendees`. The sitemap covers the rest.
6. Monitor **Pages** and the sitemap's last-read date and discovered-page count.
   Sitemap submission and indexing requests do not guarantee inclusion or timing.

Google's official guidance:
[build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
and [request recrawling](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl).

## Registration forms (Notion)

`/attendees` and `/delegates` post to `/api/attendees` and `/api/delegates`, which save one
row per email in Notion (a repeat email gets a 409). Both databases need the same columns:
`Name` (title), `Email` (email), `Phone` (phone number), `College / Organisation` (text),
and must be shared with the Notion integration.

Environment variables:

- `NOTION_TOKEN` — the integration secret
- `NOTION_ATTENDEES_DB_ID` — attendees database id
- `NOTION_DELEGATES_DB_ID` — delegates database id

Run `npm run check:attendees` for the API self-check (Notion is mocked).

The volunteer page and API are switched off by the `_` prefix on `app/_volunteers` and
`app/api/_volunteer`; restore them together with the commented-out nav, footer and sitemap entries.
