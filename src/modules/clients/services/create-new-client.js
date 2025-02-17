import { createNewUser } from '../../../database/repositories/clients.js';

export default class CreateNewClientSvc {
  async execute(document, name, customerId, password) {
    const result = await createNewUser(document, name, customerId, password);

    return result;
  }
}
