import express from 'express';

import createNewClientHandle from './modules/clients/handlers/create-new-client.js';
import createNewPaymentHandle from './modules/clients/handlers/create-new-payment.js';
import createPixPaymentHandle from './modules/payments/handlers/create-pix.js';
import createBilletPaymentHandle from './modules/payments/handlers/create-billet.js';
import createCreditCardPaymentHandle from './modules/payments/handlers/create-credit-card.js';

const routes = express.Router({
  mergeParams: true,
  caseSensitive: true,
  strict: true,
});

routes.post('/clients/start', createNewClientHandle.handle);

routes.post('/clients/new-payment', createNewPaymentHandle.handle);

routes.post('/payments/pix', createPixPaymentHandle.handle);

routes.post('/payments/billet', createBilletPaymentHandle.handle);

routes.post('/payments/credit-card', createCreditCardPaymentHandle.handle);

export default routes;
