import ApiClient from './api-client.js';

class AsaasClient {
  constructor() {
    this.api = new ApiClient(process.env.ASAAS_BASE_URL, {
      'accept': 'application/json',
      'access_token': process.env.ASAAS_API_KEY,
      'content-type': 'application/json',
    });
  }

  async listOneClient(id) {
    try {
      const result = await this.api.request({
        endpoint: `/v3/customers/${id}`,
        method: 'GET',
      });

      return result;
    } catch (err) {
      throw { status: 500 };
    }
  }

  async createClient(name, document) {
    try {
      const result = await this.api.request({
        endpoint: `/v3/customers`,
        method: 'POST',
        data: {
          name,
          cpfCnpj: document,
        },
      });

      return result;
    } catch (err) {
      throw { status: 500 };
    }
  }

  async listActivePixKey() {
    try {
      const result = await this.api.request({
        endpoint: `/v3/pix/addressKeys`,
        method: 'GET',
        params: { status: 'ACTIVE' },
      });

      return result;
    } catch (err) {
      throw { status: 500 };
    }
  }

  async createPixKey() {
    try {
      const result = await this.api.request({
        endpoint: `/v3/pix/addressKeys`,
        method: 'POST',
        data: {
          type: 'EVP',
        },
      });

      return result;
    } catch (err) {
      throw { status: 500 };
    }
  }

  async createPixQrCode(addressKey, value) {
    try {
      const result = await this.api.request({
        endpoint: `/v3/pix/qrCodes/static`,
        method: 'POST',
        data: {
          addressKey: addressKey,
          description: 'Perfect-Pay: Pix Qrcode',
          value: value ?? null,
          format: 'ALL',
          expirationSeconds: process.env.PIX_QRCODE_EXPIRATION_IN_SECONDS,
        },
      });

      return result;
    } catch (err) {
      throw { status: 500 };
    }
  }

  async createBillet(customerId, value, dueDate) {
    const result = await this.api.request({
      endpoint: `/v3/payments`,
      method: 'POST',
      data: {
        billingType: 'BOLETO',
        customer: customerId,
        value,
        dueDate,
      },
    });

    return result;
  }
}

export default AsaasClient;
