import express from 'express';
import 'dotenv/config';

import routes from './src/routes.js';
import db from './src/database/index.js';
import { errorHandler } from './src/middlewares/error-handler.js';

const app = express();

app.use(express.json());
app.use(routes);
app.use(errorHandler);

// const rowsDefault = db
//   .prepare(
//     `
//       SELECT * FROM clients
//       WHERE document = ${process.env.DEFAULT_CLIENT_DOC}
//       LIMIT 1
//     `
//   )
//   .all();

// if (rowsDefault.length < 1) {
//   const insert = db.prepare(
//     'INSERT INTO clients (document, name, customer_id) VALUES (?, ?, ?)'
//   );

//   insert.run(
//     process.env.DEFAULT_CLIENT_DOC,
//     process.env.DEFAULT_CLIENT_NAME,
//     process.env.DEFAULT_CLIENT_CUSTOMER_ID
//   );
//   console.log('Insert default client successfully');
// }

export default app;
