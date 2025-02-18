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
} catch (err) {
  console.error(err);
}

export default db;
