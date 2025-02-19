import db from '../index.js';

export async function insertNewQrCode(customerId, value, key, image, payload) {
  try {
    const insert = db.prepare(
      `INSERT INTO qrcodes 
      (customer_id, value, key, encoded_image, payload) 
      VALUES (?, ?, ?, ?, ?)`
    );

    const result = insert.run(customerId, value, key, image, payload);
    console.log('Insert into qrcodes successfully');

    return {
      id: result.lastInsertRowid,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function getQrcodeById(id) {
  const [row] = db
    .prepare(
      `
    SELECT * FROM qrcodes WHERE id = ${id}
    LIMIT 1;
  `
    )
    .all();

  return row;
}
