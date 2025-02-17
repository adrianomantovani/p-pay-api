import axios from 'axios';

class ApiClient {
  constructor(baseURL, defaultHeaders = {}) {
    this.client = axios.create({
      baseURL,
      headers: defaultHeaders,
    });

    this.errorResponse = {
      success: false,
      status: 400,
      message: '',
    };
  }

  async request({
    endpoint,
    method = 'GET',
    data = null,
    params = {},
    headers = {},
  }) {
    try {
      const response = await this.client.request({
        url: endpoint,
        method,
        data,
        params,
        headers,
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  handleError(error) {
    if (error.response) {
      const { status, data } = error.response;
      return new Error(`Erro ${status}: ${JSON.stringify(data)}`);
    } else if (error.request) {
      return new Error('Sem resposta do servidor. Verifique sua conexão.');
    } else {
      return new Error(`Erro na requisição: ${error.message}`);
    }
  }
}

export default ApiClient;
