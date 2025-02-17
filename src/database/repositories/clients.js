import db from '../index.js';
import passwordBcrypt from '../../shared/password-bcrypt.js';

export async function createNewUser(document, name, customerId, password) {
  const insert = db.prepare(
    'INSERT INTO clients (document, name, customer_id, password) VALUES (?, ?, ?, ?)'
  );

  const passwordHash = await passwordBcrypt.hash(password);

  insert.run(document, name, customerId, passwordHash);
  console.log('Insert new client successfully');

  return {
    document,
    name,
    customerId,
  };
}

export function getClientByDocument(document) {
  const rows = db
    .prepare(
      `
      SELECT * FROM clients
      WHERE document = ${document}
      LIMIT 1
    `
    )
    .all();

  return rows;
}
