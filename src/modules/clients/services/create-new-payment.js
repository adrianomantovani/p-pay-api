import { getClientByDocument } from '../../../database/repositories/clients.js';
import { cancelPendingPayments } from '../../../database/repositories/payments.js';

export default class CreateNewPaymentSvc {
  async execute(document) {
    const client = await getClientByDocument(document);

    await cancelPendingPayments(client.customer_id);

    return {
      document,
      name: client.name,
      customerId: client.customer_id,
      pendingPayment: null,
    };
  }
}
