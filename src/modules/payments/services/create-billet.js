import AsaasClient from '../../../shared/asaas-client.js';
import getDueDate from '../../../shared/get-due-date.js';

export default class CreateBilletPaymentSvc {
  async execute(customerId, value) {
    try {
      const dueDate = getDueDate();
      const result = await new AsaasClient().createBillet(
        customerId,
        value,
        dueDate
      );

      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
