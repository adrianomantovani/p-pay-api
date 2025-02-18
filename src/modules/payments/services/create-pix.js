import AsaasClient from '../../../shared/asaas-client.js';

export default class CreatePixPaymentSvc {
  constructor() {
    this.asaas = new AsaasClient();
  }

  async execute() {
    try {
      let pixKey = this.getEvpKey();

      if (!pixKey) pixKey = this.createEvpKey;

      const pixQrCode = await this.asaas.createPixQrCode();
      return pixQrCode;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async getEvpKey() {
    const result = await this.asaas.listActivePixKey();
    return result.data[0].key;
  }

  async createEvpKey() {
    const result = await this.asaas.createPixKey();
    return result.key;
  }
}
