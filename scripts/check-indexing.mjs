import assert from 'node:assert/strict';

// Run against the local production build or the deployed production domain.
const base = new URL(process.argv[2] || 'http://localhost:4181');
const origin = 'https://www.festivalofideas.org';
const sitemapResponse = await fetch(new URL('/sitemap.xml', base));
assert.equal(sitemapResponse.status, 200, 'Sitemap must return 200');
assert.match(sitemapResponse.headers.get('content-type'), /xml/);
const xml = await sitemapResponse.text();
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
assert.ok(urls.length > 0, 'Sitemap must contain published pages');
assert.equal(new Set(urls).size, urls.length, 'Sitemap must not contain duplicates');

const robotsResponse = await fetch(new URL('/robots.txt', base));
assert.equal(robotsResponse.status, 200, 'robots.txt must return 200');
assert.match(robotsResponse.headers.get('content-type'), /text\/plain/);
const robots = await robotsResponse.text();
assert.match(robots, /Allow: \/\s/);
assert.match(robots, /Disallow: \/api\//);
assert.ok(robots.includes(`Sitemap: ${origin}/sitemap.xml`));
assert.doesNotMatch(robots, /Disallow: \/\s/, 'Public pages must be crawlable');

async function checkPage(path, { canonical, index = true, status = 200 } = {}) {
  const response = await fetch(new URL(path, base), { redirect: 'manual', headers: { 'User-Agent': 'Googlebot' } });
  assert.equal(response.status, status, `${path}: unexpected HTTP status`);
  const html = await response.text();
  if (status === 404) {
    assert.match(html, /<meta name="robots" content="[^"]*noindex/, `${path}: missing 404 noindex`);
    return;
  }
  const canonicalTag = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  assert.ok(canonicalTag, `${path}: missing canonical`);
  assert.equal(new URL(canonicalTag).href, new URL(canonical).href, `${path}: canonical mismatch`);
  assert.match(html, /<meta name="description" content="[^"]+"/, `${path}: missing description`);
  const directives = html.match(/<meta name="robots" content="([^"]+)"/)?.[1];
  assert.ok(directives, `${path}: missing robots metadata`);
  assert.equal(directives.split(', ').includes('noindex'), !index, `${path}: incorrect indexing directive`);
  assert.ok(index ? directives.split(', ').includes('index') : true, `${path}: missing index directive`);
  assert.doesNotMatch(response.headers.get('x-robots-tag') || '', /noindex/, `${path}: blocking response header`);
}

// Check a few pages at a time so this also works against the live site.
for (let offset = 0; offset < urls.length; offset += 4) {
  await Promise.all(urls.slice(offset, offset + 4).map((url) => {
    const canonical = new URL(url);
    assert.equal(canonical.origin, origin, 'Sitemap must use the production origin');
    assert.equal(canonical.search, '', 'Sitemap must exclude query variants');
    assert.equal(canonical.hash, '', 'Sitemap must exclude fragments');
    return checkPage(canonical.pathname, { canonical: url });
  }));
}

assert.ok(!urls.includes(`${origin}/about/100-years-of-srcc`), 'Duplicate About page must be excluded');
assert.ok(!urls.some((url) => /\/speakers\/e\d+$/.test(url)), 'Unannounced speakers must be excluded');
await checkPage('/about/100-years-of-srcc', { canonical: `${origin}/about` });
await checkPage('/speakers?tab=past', { canonical: `${origin}/speakers` });
await checkPage('/speakers?tab=expected', { canonical: `${origin}/speakers`, index: false });
await checkPage('/speakers/e1', { canonical: `${origin}/speakers/e1`, index: false });
for (const path of ['/speakers/not-a-speaker', '/programmes/not-a-programme', '/about/not-a-section']) {
  await checkPage(path, { status: 404 });
}

const redirect = await fetch(new URL('/index.html', base), { redirect: 'manual' });
assert.equal(redirect.status, 308, 'Legacy home URL must permanently redirect');
assert.equal(new URL(redirect.headers.get('location'), base).pathname, '/');
console.log(`Passed: ${urls.length} sitemap URLs, robots.txt, canonical tags, index/noindex rules, 404s and legacy redirect.`);
