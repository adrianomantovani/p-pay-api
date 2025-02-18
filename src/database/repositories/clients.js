import db from '../index.js';

export async function createNewUser(document, name, customerId) {
  const insert = db.prepare(
    'INSERT INTO clients (document, name, customer_id) VALUES (?, ?, ?)'
  );

  insert.run(document, name, customerId);
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
