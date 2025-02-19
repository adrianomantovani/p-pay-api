import db from '../index.js';

export async function insertNewCreditcard(customerId, value, paymentId) {
  try {
    const insert = db.prepare(
      'INSERT INTO creditcards (customer_id, value, payment_id) VALUES (?, ?, ?)'
    );

    const result = insert.run(customerId, value, paymentId);
    console.log('Insert into creditcards successfully');

    return {
      id: result.lastInsertRowid,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
}
