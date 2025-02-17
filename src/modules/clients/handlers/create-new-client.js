import CreateNewClientSvc from '../services/create-new-client.js';

class CreateNewClientHandler {
  async handle(request, response) {
    const { document, name, customerId, password } = request.body;

    const result = await new CreateNewClientSvc().execute(
      document,
      name,
      customerId,
      password
    );

    return response.json(result);
  }
}

const createNewClientHandle = new CreateNewClientHandler();
export default createNewClientHandle;
