import * as Yup from 'yup';
import CreatePixPaymentSvc from '../services/create-pix.js';

import handleError from '../../../shared/handle-error.js';

class CreatePixPaymentHanler {
  async handle(request, response) {
    try {
      const schema = Yup.object().shape({
        customerId: Yup.string().required('O customerId é obrigatório'),
        value: Yup.number('O valor deve ser numérico').required(
          'O valor é obrigatório'
        ),
      });

      await schema.validate(request.body, { abortEarly: false });

      const { customerId, value } = request.body;

      const result = await new CreatePixPaymentSvc().execute(customerId, value);

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
