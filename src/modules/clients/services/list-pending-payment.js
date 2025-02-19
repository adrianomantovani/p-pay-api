import { getPendingPaymentByDocument } from '../../../database/repositories/payments.js';
import { getBilletById } from '../../../database/repositories/billets.js';
import { getQrcodeById } from '../../../database/repositories/qrcodes.js';
import { getCreditcardsById } from '../../../database/repositories/creditcard.js';

import { billetMessage, qrcodeMessage } from '../../../shared/messages.js';

export default class ListClientPendingPayment {
  constructor(document) {
    this.document = document;
    this.message = '';
    this.type = null;
    this.value = 0;
    this.id = null;
    this.url = null;
    this.encodedImage = null;
    this.payload = null;
  }

  async execute() {
    const payment = await getPendingPaymentByDocument(this.document);
    if (!payment) return null;

    this.id = payment.id;
    console.log('payment.type:', payment.type);

    switch (payment.type) {
      case 'billet':
        this.type = 'billet';
        await this.performBillet(payment.context_id);
        break;
      case 'qrcode':
        this.type = 'qrcode';
        await this.performQrcode(payment.context_id);
        break;
      case 'creditcard':
        this.type = 'creditcard';
        await this.performCreditcard(payment.context_id);
        break;
      default:
        throw 'found incorrect type on payments';
    }

    return {
      message: this.message,
      type: this.type,
      value: this.value,
      id: this.id,
      url: this.url,
      encodedImage: this.encodedImage,
      payload: this.payload,
    };
  }

  async performBillet(id) {
    const rowBillet = await getBilletById(id);
    this.value = rowBillet.value;
    this.url = rowBillet.url;
    this.message = billetMessage;
  }

  async performQrcode(id) {
    const rowQrcode = await getQrcodeById(id);
    this.value = rowQrcode.value;
    this.encodedImage = rowQrcode.encoded_image;
    this.payload = rowQrcode.payload;
    this.message = qrcodeMessage;
  }

  async performCreditcard(id) {
    const rowCreditcard = await getCreditcardsById(id);
    this.value = rowCreditcard.value;
  }
}
