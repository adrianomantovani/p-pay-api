import AsaasClient from '../../../shared/asaas-client.js';
import handleError from '../../../shared/handle-error.js';

class CheckClient {
  async handle(request, response) {
    try {
      const result = await new AsaasClient().listOneClient(
        process.env.DEFAULT_CLIENT_CUSTOMER_ID
      );

      return response.json(result);
    } catch (err) {
      const message = handleError(err);
      return response.status(400).json({
        error: true,
        message,
      });
    }
  }
}

const checkClientHandle = new CheckClient();
export default checkClientHandle;
