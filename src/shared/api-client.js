import axios from 'axios';
import createError from 'http-errors';

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
    const response = await this.client
      .request({
        url: endpoint,
        method,
        data,
        params,
        headers,
      })
      .catch((err) => {
        const error = new createError(err.response.status, err.response.data);
        console.log('>>>> ApiClient >> status:', err.response.status);
        throw error;
      });
    return response.data;
  }
}

export default ApiClient;
