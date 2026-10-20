// POST /api/attendees: registers an attendee in Notion, one row per email (see lib/registration.js).
// Env: NOTION_TOKEN, NOTION_ATTENDEES_DB_ID.
import { registrationRoute } from '../../../lib/registration.js';

export const POST = registrationRoute('NOTION_ATTENDEES_DB_ID');
