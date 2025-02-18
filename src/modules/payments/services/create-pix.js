import AsaasClient from '../../../shared/asaas-client.js';

export default class CreatePixPaymentSvc {
  constructor() {
    this.asaas = new AsaasClient();
  }

  async execute(value) {
    try {
      let pixKey = await this.getEvpKey();

      if (!pixKey) pixKey = await this.createEvpKey();
      const pixQrCode = await this.asaas.createPixQrCode(pixKey, value);
      return pixQrCode;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async getEvpKey() {
    try {
      const result = await this.asaas.listActivePixKey();
      return result.data[0].key;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async createEvpKey() {
    try {
      const result = await this.asaas.createPixKey();
      return result.key;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
