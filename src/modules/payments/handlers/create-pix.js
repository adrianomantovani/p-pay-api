import * as Yup from 'yup';
import CreatePixPaymentSvc from '../services/create-pix.js';

import handleError from '../../../shared/handle-error.js';

class CreatePixPaymentHanler {
  async handle(request, response) {
    try {
      const schema = Yup.object().shape({
        value: Yup.number().required('O valor é obrigatório'),
      });

      await schema.validate(request.body, { abortEarly: false });

      const { value } = request.body;

      const result = await new CreatePixPaymentSvc().execute(value);

      return response.status(201).json(result);
    } catch (err) {
      const message = handleError(err);
      return response.status(400).json({
        error: true,
        message,
      });
    }
  }
}

const createPixPaymentHandle = new CreatePixPaymentHanler();
export default createPixPaymentHandle;
