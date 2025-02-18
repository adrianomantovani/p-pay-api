import express from 'express';

import checkClientHandle from './modules/clients/handlers/check-client-exist.js';
import getClientByDocumentHandle from './modules/clients/handlers/get-client-by-document.js';
import createNewClientHandle from './modules/clients/handlers/create-new-client.js';
import createPixPaymentHandle from './modules/payments/handlers/create-pix.js';
import createBilletPaymentHandle from './modules/payments/handlers/create-billet.js';
import createCreditCardPaymentHandle from './modules/payments/handlers/create-credit-card.js';

const routes = express.Router({
  mergeParams: true,
  caseSensitive: true,
  strict: true,
});

routes.get('/clients/default-client', checkClientHandle.handle);

routes.get(
  '/clients/client-by-document/:doc',
  getClientByDocumentHandle.handle
);

routes.post('/clients/create', createNewClientHandle.handle);

routes.post('/payments/pix', createPixPaymentHandle.handle);

routes.post('/payments/billet', createBilletPaymentHandle.handle);

routes.post('/payments/credit-card', createCreditCardPaymentHandle.handle);

export default routes;
