import ApiClient from './api-client.js';

const url = process.env.ASAAS_BASE_URL;

class AsaasClient {
  constructor() {}

  async listOneClient(id) {
    try {
      const api = new ApiClient(url, {
        accept: 'application/json',
      });

      const result = await api.request({
        endpoint: `/v3/customers/${id}`,
        method: 'GET',
        headers: {
          access_token: process.env.ASAAS_API_KEY,
        },
      });

      return result;
    } catch (error) {
      console.error(error);
    }
  }
}

export default AsaasClient;
