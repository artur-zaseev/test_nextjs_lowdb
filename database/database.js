import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { Low, JSONFile } from 'lowdb';

// __dirname in Node.js when using ES6 modules
const __dirname = dirname(fileURLToPath(import.meta.url));

const filename = join(__dirname, 'db.json');
const adapter = new JSONFile(filename);
export const db = new Low(adapter);
