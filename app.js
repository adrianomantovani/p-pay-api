import express from 'express';
import 'dotenv/config';

import routes from './src/routes.js';
import db from './src/database/index.js';

const app = express();

app.use(express.json());
app.use(routes);

export default app;
