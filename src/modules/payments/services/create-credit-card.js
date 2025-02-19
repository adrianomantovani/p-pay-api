import AsaasClient from '../../../shared/asaas-client.js';
import getDueDate from '../../../shared/get-due-date.js';
import { insertNewCreditcard } from '../../../database/repositories/creditcard.js';
import { insertNewPayment } from '../../../database/repositories/payments.js';

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

      const rowCreditcard = await insertNewCreditcard(
        customerId,
        value,
        paymentId
      );

      await insertNewPayment(
        result.id,
        'creditcard',
        customerId,
        rowCreditcard.id,
        'paid'
      );

      return {
        success: true,
        message:
          'Obrigado! Seu pagamento com cartão de crédito foi processado com sucesso.',
        paymentId: result.id,
      };
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
