import { createNewUser } from '../../../database/repositories/clients.js';
import AsaasClient from '../../../shared/asaas-client.js';

export default class CreateNewClientSvc {
  async execute(document, name, password) {
    try {
      const result = await new AsaasClient().createClient(name, document);
      const customerId = result.id;

      const rowClient = await createNewUser(
        document,
        name,
        customerId,
        password
      );
      return rowClient;
    } catch (err) {
      console.error(err);
    }
  }
}
