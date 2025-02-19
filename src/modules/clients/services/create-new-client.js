import { getClientByDocument } from '../../../database/repositories/clients.js';
import { createNewClient } from '../../../database/repositories/clients.js';
import ListClientPendingPayment from './list-pending-payment.js';
import AsaasClient from '../../../shared/asaas-client.js';

export default class CreateNewClientSvc {
  constructor() {
    this.client = new AsaasClient();
    this.customerId = null;
  }

  async execute(document, name) {
    try {
      const rowClient = await getClientByDocument(document);

      if (rowClient) {
        this.customerId = rowClient.customer_id;
      } else {
        const asaasClient = await this.client.listOneClient(document);
        if (asaasClient.data && asaasClient.data.length > 0) {
          this.customerId = asaasClient.data.id;
        }
      }

      if (!this.customerId) await this.createAsaasClient(document, name);

      const pendingPayment = await new ListClientPendingPayment(
        document
      ).execute();

      return {
        document,
        name,
        customerId: this.customerId,
        pendingPayment,
      };
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async createAsaasClient(document, name) {
    try {
      const result = await this.client.createClient(name, document);
      this.customerId = result.id;

      await this.insertNewClient(document, name);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async insertNewClient(document, name) {
    try {
      await createNewClient(document, name, this.customerId);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
