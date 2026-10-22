// Self-check for /api/attendees and /api/delegates with Notion mocked in memory: `node scripts/check-attendees.mjs`
import assert from 'node:assert/strict';

const rows = [];
let rateLimitNext = false;
globalThis.fetch = async (url, init) => {
  if (rateLimitNext) { rateLimitNext = false; return new Response('slow down', { status: 429, headers: { 'retry-after': '0.01' } }); }
  const body = JSON.parse(init.body);
  if (url.endsWith('/query')) {
    const want = body.filter.email.equals;
    return Response.json({ results: rows.filter((r) => r.Email.email === want) });
  }
  rows.push(body.properties);
  return Response.json({});
};

const { POST } = await import('../app/api/attendees/route.js');
const post = (data) => POST(new Request('http://x', { method: 'POST', body: JSON.stringify(data) }));
const ok = { name: 'Asha', email: 'Asha@Example.com', phone: '+91 98765 43210', organisation: 'Acme' };

assert.equal((await post(ok)).status, 200);
assert.equal(rows[0].Email.email, 'asha@example.com');
assert.equal(rows[0].Phone.phone_number, '9876543210');
assert.equal((await post({ ...ok, email: ' asha@EXAMPLE.com ' })).status, 409, 'duplicate email, different case');
assert.equal(rows.length, 1);
assert.equal((await post({ ...ok, email: 'nope' })).status, 400);
assert.equal((await post({ ...ok, phone: '12345' })).status, 400);
assert.equal((await post({ ...ok, name: '' })).status, 400);
assert.equal((await post({ ...ok, email: 'other@example.com' })).status, 200);

// honeypot filled: fake success, nothing saved
assert.equal((await post({ ...ok, email: 'bot@example.com', website: 'x' })).status, 200);
assert.equal(rows.length, 2);

// double-submit of the same email at once: exactly one row
const [a, b] = await Promise.all([post({ ...ok, email: 'twice@example.com' }), post({ ...ok, email: 'twice@example.com' })]);
assert.deepEqual([a.status, b.status].sort(), [200, 409]);
assert.equal(rows.filter((r) => r.Email.email === 'twice@example.com').length, 1);

// Notion 429 is retried
rateLimitNext = true;
assert.equal((await post({ ...ok, email: 'busy@example.com' })).status, 200);
assert.equal(rows.length, 4);

// delegates share the handler, with their own database + in-flight set
const { POST: delegatePOST } = await import('../app/api/delegates/route.js');
const postD = (data) => delegatePOST(new Request('http://x', { method: 'POST', body: JSON.stringify(data) }));
assert.equal((await postD({ ...ok, email: 'del@example.com' })).status, 200);
assert.equal((await postD({ ...ok, email: 'DEL@example.com' })).status, 409);
console.log('attendees + delegates: ok');
