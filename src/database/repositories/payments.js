import db from '../index.js';

export async function insertNewPayment(
  id,
  type,
  customerId,
  contextId,
  status
) {
  try {
    const insert = db.prepare(
      'INSERT INTO payments (id, type, customer_id, context_id, status) VALUES (?, ?, ?, ?, ?)'
    );

    insert.run(id, type, customerId, contextId, status);
    console.log('Insert into payments successfully');

    return {
      type,
      contextId,
      status,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
}
