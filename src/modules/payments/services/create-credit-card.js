import AsaasClient from '../../../shared/asaas-client.js';
import getDueDate from '../../../shared/get-due-date.js';

export default class CreateCreditCardPaymentSvc {
  constructor() {
    this.client = new AsaasClient();
  }

  async execute(customerId, value, creditCard, holderInfo) {
    try {
      const dueDate = getDueDate();
      const payment = await this.client.createCreditCardPayment(
        customerId,
        value,
        dueDate
      );

      const paymentId = payment.id;

      const result = await this.client.processCardCharge(
        paymentId,
        creditCard,
        holderInfo
      );

      return {
        success: true,
        paymentId: result.id,
      };
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
