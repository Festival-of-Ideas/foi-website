// POST /api/delegates: registers a delegate in Notion, one row per email (see lib/registration.js).
// Env: NOTION_TOKEN, NOTION_DELEGATES_DB_ID (same columns as the attendees database).
import { registrationRoute } from '../../../lib/registration.js';

export const POST = registrationRoute('NOTION_DELEGATES_DB_ID');
