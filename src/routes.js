import express from 'express';

import checkClientHandle from './modules/clients/handlers/check-client-exist.js';
import getClientByDocumentHandle from './modules/clients/handlers/get-client-by-document.js';
import createNewClientHandle from './modules/clients/handlers/create-new-client.js';

const routes = express.Router({
  mergeParams: true,
  caseSensitive: true,
  strict: true,
});

routes.get('/default-client', checkClientHandle.handle);

routes.get('/client-by-document/:doc', getClientByDocumentHandle.handle);

routes.post('/user-create', createNewClientHandle.handle);

export default routes;
