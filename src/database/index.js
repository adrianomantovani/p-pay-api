import Database from 'better-sqlite3';

const db = new Database(
  `./${process.env.DATABASE_NAME}`,
  Database.OPEN_READWRITE
);

try {
  db.exec(`
    CREATE TABLE IF NOT EXISTS clients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_id TEXT NOT NULL,
      document TEXT NOT NULL,
      name TEXT NOT NULL
    );
  `);
  console.log('Created table clients successfully');

  db.exec(`
    CREATE TABLE IF NOT EXISTS billets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_id TEXT NOT NULL,
      value NUMBER NOT NULL,
      url TEXT NOT NULL
    );
  `);
  console.log('Created table billets successfully');

  db.exec(`
    CREATE TABLE IF NOT EXISTS creditcards (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_id TEXT NOT NULL,
      value NUMBER NOT NULL,
      payment_id TEXT NOT NULL
    );
  `);
  console.log('Created table creditcards successfully');

  db.exec(`
    CREATE TABLE IF NOT EXISTS qrcodes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_id TEXT NOT NULL,
      value NUMBER NOT NULL,
      key TEXT NOT NULL,
      encoded_image TEXT NOT NULL,
      payload TEXT NOT NULL
    );
  `);
  console.log('Created table qrcodes successfully');

  db.exec(`
    CREATE TABLE IF NOT EXISTS payments (
      id TEXT PRIMARY KEY NOT NULL,
      customer_id TEXT NOT NULL,
      type TEXT NOT NULL,
      context_id INTEGER NOT NULL,
      status TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
  console.log('Created table payments successfully');
} catch (err) {
  console.error(err);
}

export default db;
