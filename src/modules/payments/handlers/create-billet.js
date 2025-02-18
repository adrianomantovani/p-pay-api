import * as Yup from 'yup';
import CreateBilletPaymentSvc from '../services/create-billet.js';
import handleError from '../../../shared/handle-error.js';

class CreateBilletPaymentHandler {
  async handle(request, response) {
    try {
      const schema = Yup.object().shape({
        customerId: Yup.string().required('O customerId é obrigatório'),
        value: Yup.number().required('O valor é obrigatório'),
      });

      await schema.validate(request.body, { abortEarly: false });

      const { customerId, value } = request.body;
      const result = await new CreateBilletPaymentSvc().execute(
        customerId,
        value
      );

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

const createBilletPaymentHandle = new CreateBilletPaymentHandler();
export default createBilletPaymentHandle;
