import AsaasClient from '../../../shared/asaas-client.js';

class CheckClient {
  async handle(request, response) {
    try {
      const result = await new AsaasClient().listOneClient(
        process.env.DEFAULT_CLIENT_CUSTOMER_ID
      );

      return response.json(result);
    } catch (err) {
      return response.status(500).json({
        error: true,
        message: err,
      });
    }
  }
}

const checkClientHandle = new CheckClient();
export default checkClientHandle;
