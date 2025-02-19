import db from '../index.js';

export async function createNewClient(document, name, customerId) {
  try {
    const insert = db.prepare(
      'INSERT INTO clients (document, name, customer_id) VALUES (?, ?, ?)'
    );

    insert.run(document, name, customerId);
    console.log('Insert into clients successfully');

    return {
      document,
      name,
      customerId,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export function getClientByDocument(document) {
  const rows = db
    .prepare(
      `
      SELECT * FROM clients
      WHERE document = ${document}
      LIMIT 1;
    `
    )
    .all();

  return rows;
}
