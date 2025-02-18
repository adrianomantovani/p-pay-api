import AsaasClient from '../../../shared/asaas-client.js';

export default class CreateBilletPaymentSvc {
  async execute(customerId, value) {
    try {
      const newDate = new Date(Date.now());
      newDate.setMonth(newDate.getMonth() + 1);

      const year = newDate.getFullYear();
      const month = String(newDate.getMonth() + 1).padStart(2, '0');
      const day = String(newDate.getDate()).padStart(2, '0');

      const dueDate = `${year}-${month}-${day}`;

      const result = await new AsaasClient().createBillet(
        customerId,
        value,
        dueDate
      );

      return result;
    } catch (err) {
      console.error(err);
    }
  }
}
