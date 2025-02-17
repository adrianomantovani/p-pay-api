import Database from 'better-sqlite3';

const db = new Database(
  `./src/database/${process.env.DATABASE_NAME}`,
  Database.OPEN_READWRITE
);

try {
  db.exec(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          customer_id TEXT NOT NULL,
          document TEXT NOT NULL,
          name TEXT NOT NULL,
          password TEXT NOT NULL
        );
      `);
  console.log('Created table users successfully');
} catch (err) {
  console.error(err);
}

export default db;
