import db from '../index.js';

export async function insertNewBillet(customerId, value, url) {
  try {
    const insert = db.prepare(
      'INSERT INTO billets (customer_id, value, url) VALUES (?, ?, ?)'
    );

    const result = insert.run(customerId, value, url);
    console.log('Insert into billets successfully');

    return {
      id: result.lastInsertRowid,
      customerId,
      value,
      url,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function getBilletById(id) {
  const [row] = db
    .prepare(
      `
    SELECT * FROM billets WHERE id = ${id}
    LIMIT 1;
  `
    )
    .all();

  return row;
}
