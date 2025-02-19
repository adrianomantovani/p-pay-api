import { createNewClient } from '../../../database/repositories/clients.js';
import AsaasClient from '../../../shared/asaas-client.js';

export default class CreateNewClientSvc {
  async execute(document, name) {
    try {
      const result = await new AsaasClient().createClient(name, document);
      const customerId = result.id;

      const rowClient = await createNewClient(document, name, customerId);
      return rowClient;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
