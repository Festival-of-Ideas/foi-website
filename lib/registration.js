// Shared POST handler for the registration forms (/api/attendees, /api/delegates):
// one Notion row per email. Both databases use the same columns.
// Env: NOTION_TOKEN plus the database id env var named by each route.
import { text, json, normaliseEmail, normalisePhone, isEmail, isPhone, exists, createRow } from './notion.js';

// form field -> Notion column name
const COLUMNS = {
  name: 'Name',
  email: 'Email',
  phone: 'Phone',
  organisation: 'College / Organisation',
};
const MAX_LEN = 500;

export function registrationRoute(dbEnv) {
  // Emails with a submit in progress on this instance, so a double-click can't pass the check twice.
  const inFlight = new Set();

  return async function POST(req) {
    const body = (await req.json().catch(() => null)) || {};
    // Honeypot: the form hides a `website` field from people; bots fill it. Pretend success.
    if (body.website) return json(200, { ok: true });
    const data = {};
    for (const key of Object.keys(COLUMNS)) {
      const value = String(body[key] ?? '').trim();
      if (!value) return json(400, { error: `Missing ${key}` });
      if (value.length > MAX_LEN) return json(400, { error: `${key} is too long` });
      data[key] = value;
    }

    // Lowercase email so "A@x.com" and "a@x.com" count as the same person
    data.email = normaliseEmail(data.email);
    data.phone = normalisePhone(data.phone);
    if (!isEmail(data.email)) return json(400, { error: 'Enter a valid email' });
    if (!isPhone(data.phone)) return json(400, { error: 'Enter a valid 10-digit Indian mobile number' });

    const db = process.env[dbEnv];
    if (inFlight.has(data.email)) return json(409, { error: 'This email is already being registered. Please wait a moment.' });
    inFlight.add(data.email);
    try {
      // ponytail: check-then-insert; Notion has no unique constraint. The in-flight set covers
      // double-submits hitting one instance; two instances racing on the same email within ~1s can
      // still both insert. Add a Redis SETNX lock on the email if duplicates ever show up.
      if (await exists(db, { property: COLUMNS.email, email: { equals: data.email } })) {
        return json(409, { error: 'This email is already registered.' });
      }
      await createRow(db, {
        [COLUMNS.name]: { title: [{ text: { content: data.name } }] },
        [COLUMNS.email]: { email: data.email },
        [COLUMNS.phone]: { phone_number: data.phone },
        [COLUMNS.organisation]: text(data.organisation),
      });
    } catch (err) {
      console.error(err);
      return json(502, { error: 'Could not save registration. Please try again.' });
    } finally {
      inFlight.delete(data.email);
    }
    return json(200, { ok: true });
  };
}
