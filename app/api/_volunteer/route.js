// POST /api/volunteer: forwards a volunteer application to the Notion database.
// Env: NOTION_TOKEN (integration secret), NOTION_DB_ID (volunteer database id).
import { text, json, normaliseEmail, normalisePhone, isEmail, isPhone, exists, createRow } from '../../../lib/notion.js';

// form field -> Notion column name
const COLUMNS = {
  name: 'Name',
  phone: 'Phone',
  email: 'Email',
  college: 'College',
  course_year: 'Course & Year',
  team: 'Team',
  about: 'About',
  why_team: 'Why this team',
  skills: 'Skills',
  experience: 'Experience',
  idea: 'Idea',
  anything_else: 'Anything else',
};
const OPTIONAL = ['anything_else'];
const MAX_LEN = 10000;

export async function POST(req) {
  const body = (await req.json().catch(() => null)) || {};
  const data = {};
  for (const key of Object.keys(COLUMNS)) {
    const value = String(body[key] ?? '').trim();
    if (!value && !OPTIONAL.includes(key)) return json(400, { error: `Missing ${key}` });
    if (value.length > MAX_LEN) return json(400, { error: `${key} is too long` });
    data[key] = value;
  }

  // Store phone as 10 digits and email lowercased so duplicate lookups match
  data.phone = normalisePhone(data.phone);
  data.email = normaliseEmail(data.email);
  if (!isPhone(data.phone)) return json(400, { error: 'Enter a valid 10-digit Indian mobile number' });
  if (!isEmail(data.email)) return json(400, { error: 'Enter a valid email' });

  const properties = {};
  for (const [key, column] of Object.entries(COLUMNS)) {
    if (key === 'name') properties[column] = { title: [{ text: { content: data.name } }] };
    else if (key === 'phone') properties[column] = { phone_number: data.phone };
    else if (key === 'email') properties[column] = { email: data.email };
    // Notion select options can't contain commas
    else if (key === 'team') properties[column] = { select: { name: data.team.replace(/,/g, '') } };
    else properties[column] = text(data[key]);
  }

  const db = process.env.NOTION_DB_ID;
  try {
    // ponytail: check-then-insert, two simultaneous submits can both pass; fine at this volume
    if (await exists(db, { or: [
      { property: COLUMNS.email, email: { equals: data.email } },
      { property: COLUMNS.phone, phone_number: { equals: data.phone } },
    ] })) {
      return json(409, { error: 'You have already registered with this email or phone number.' });
    }
    await createRow(db, properties);
  } catch (err) {
    console.error(err);
    return json(502, { error: 'Could not save application' });
  }
  return json(200, { ok: true });
}
