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
    // console.log('Will call external api:', {
    //   endpoint,
    //   method,
    //   data,
    //   params,
    //   headers,
    // });
    const payload =
      data === null
        ? {
            url: endpoint,
            method,
            params,
            headers,
          }
        : {
            url: endpoint,
            method,
            data,
            params,
            headers,
          };
    const response = await this.client.request(payload).catch((err) => {
      const error = new createError(err.response.status, err.response.data);
      throw error;
    });
    return response.data;
  }
}

export default ApiClient;
