import AsaasClient from '../../../shared/asaas-client.js';
import getDueDate from '../../../shared/get-due-date.js';
import { insertNewBillet } from '../../../database/repositories/billets.js';
import { insertNewPayment } from '../../../database/repositories/payments.js';

import { billetMessage } from '../../../shared/messages.js';

export default class CreateBilletPaymentSvc {
  async execute(customerId, value) {
    try {
      const dueDate = getDueDate();
      const result = await new AsaasClient().createBillet(
        customerId,
        value,
        dueDate
      );

      const rowBillet = await insertNewBillet(
        customerId,
        value,
        result.bankSlipUrl
      );

      await insertNewPayment(
        result.id,
        'billet',
        customerId,
        rowBillet.id,
        'pending'
      );

      return {
        success: true,
        message: billetMessage,
        url: result.bankSlipUrl,
      };
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
