import AsaasClient from '../../../shared/asaas-client.js';
import { insertNewQrCode } from '../../../database/repositories/qrcodes.js';
import { insertNewPayment } from '../../../database/repositories/payments.js';

export default class CreatePixPaymentSvc {
  constructor() {
    this.asaas = new AsaasClient();
  }

  async execute(customerId, value) {
    try {
      let pixKey = await this.getEvpKey();

      if (!pixKey) pixKey = await this.createEvpKey();

      const pixQrCode = await this.asaas.createPixQrCode(pixKey, value);

      const rowQrcode = await insertNewQrCode(
        customerId,
        value,
        pixKey,
        pixQrCode.encodedImage,
        pixQrCode.payload
      );

      await insertNewPayment(
        pixQrCode.id,
        'qrcode',
        customerId,
        rowQrcode.id,
        'pending'
      );

      return {
        success: true,
        message:
          'Aponte a câmera para a imagem ou utilize o texto para pix copia e cola',
        ...pixQrCode,
      };
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
