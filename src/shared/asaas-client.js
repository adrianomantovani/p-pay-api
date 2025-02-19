import ApiClient from './api-client.js';

class AsaasClient {
  constructor() {
    this.api = new ApiClient(process.env.ASAAS_BASE_URL, {
      'accept': 'application/json',
      'access_token': process.env.ASAAS_API_KEY,
      'content-type': 'application/json',
    });
  }

  async listOneClient(document) {
    try {
      const result = await this.api.request({
        endpoint: `/v3/customers`,
        method: 'GET',
        params: { cpfCnpj: document },
      });

      return result;
    } catch (err) {
      console.error(err);
      throw 'Cliente não encontrado';
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
      console.error(err);
      throw 'Não foi possível efetuar a criação do cliente';
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
      console.error(err);
      throw 'Não foi possível localizar a chave pix';
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
      console.error(err);
      throw 'Não foi possível criar a chave pix';
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
      console.error(err);
      throw 'Não foi possível criar o qrcode';
    }
  }

  async createBillet(customerId, value, dueDate) {
    try {
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
    } catch (err) {
      throw 'Não foi possível criar o boleto';
    }
  }

  async createCreditCardPayment(customerId, value, dueDate) {
    try {
      const result = await this.api.request({
        endpoint: `/v3/payments`,
        method: 'POST',
        data: {
          billingType: 'CREDIT_CARD',
          customer: customerId,
          value,
          dueDate,
        },
      });

      return result;
    } catch (err) {
      console.error(err);
      throw 'Não foi possível criar a cobrança com cartão de crédito';
    }
  }

  async processCardCharge(paymentId, creditCard, holderInfo) {
    try {
      const result = await this.api.request({
        endpoint: `/v3/payments/${paymentId}/payWithCreditCard`,
        method: 'POST',
        data: {
          creditCard,
          creditCardHolderInfo: {
            ...holderInfo,
          },
        },
      });

      return result;
    } catch (err) {
      console.error(err);
      throw 'Não foi possível efetuar a transação de cartão';
    }
  }
}

export default AsaasClient;
