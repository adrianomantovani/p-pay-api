import AsaasClient from '../../../shared/asaas-client.js';

class CheckClient {
  async handle(request, response) {
    const result = await new AsaasClient().listOneClient(
      process.env.DEFAULT_CLIENT_CUSTOMER_ID
    );

    return response.json(result);
  }
}

const checkClientHandle = new CheckClient();
export default checkClientHandle;
