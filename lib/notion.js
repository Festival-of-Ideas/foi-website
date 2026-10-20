// Minimal Notion REST helpers shared by the form API routes.
// Env: NOTION_TOKEN (integration secret).

const headers = () => ({
  Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
  'Notion-Version': '2022-06-28',
  'Content-Type': 'application/json',
});

// Notion caps each rich_text block at 2000 chars, so split long answers
export const text = (v) => ({ rich_text: (v.match(/[\s\S]{1,2000}/g) || []).map((c) => ({ text: { content: c } })) });

export const json = (status, data) => Response.json(data, { status });

export const normaliseEmail = (v) => v.trim().toLowerCase();
export const normalisePhone = (v) => v.replace(/\D/g, '').replace(/^(91|0)(?=\d{10}$)/, '');
export const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
export const isPhone = (v) => /^[6-9]\d{9}$/.test(v);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Notion rate-limits to ~3 req/s per integration; registration spikes get 429s, so retry those
// a few times, honouring Retry-After. 5xx is retried only for idempotent reads: a failed-looking
// create may still have written the row, and retrying it could duplicate an entry.
async function notion(path, body, label, idempotent) {
  for (let attempt = 0; ; attempt++) {
    const res = await fetch(`https://api.notion.com/v1/${path}`, { method: 'POST', headers: headers(), body: JSON.stringify(body) });
    if (res.ok) return res.json();
    if (attempt < 3 && (res.status === 429 || (idempotent && res.status >= 500))) {
      await sleep((Number(res.headers.get('retry-after')) || 0.5 * 2 ** attempt) * 1000);
      continue;
    }
    throw new Error(`Notion ${label} ${res.status}: ${await res.text()}`);
  }
}

// Returns true if any row matches the filter. Throws on Notion errors.
export async function exists(dbId, filter) {
  return (await notion(`databases/${dbId}/query`, { page_size: 1, filter }, 'query', true)).results.length > 0;
}

export async function createRow(dbId, properties) {
  await notion('pages', { parent: { database_id: dbId }, properties }, 'create');
}
