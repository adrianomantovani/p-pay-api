import * as Yup from 'yup';
import CreatePixPaymentSvc from '../services/create-pix.js';

class CreatePixPaymentHanler {
  async handle(request, response, next) {
    try {
      const schema = Yup.object().shape({
        value: Yup.number(),
      });

      await schema.validate(request.body, { abortEarly: false });

      const { value } = request.body;

      const result = await new CreatePixPaymentSvc().execute(value);

      return response.status(201).json(result);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        err.name = 'ValidationError';
      }
      next(err);
    }
  }
}

const createPixPaymentHandle = new CreatePixPaymentHanler();
export default createPixPaymentHandle;
