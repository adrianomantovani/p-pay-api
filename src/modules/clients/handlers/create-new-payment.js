import * as Yup from 'yup';

import CreateNewPaymentSvc from '../services/create-new-payment.js';
import validateCpfCnpj from '../../../shared/validate-cpf-cnpj.js';
import handleError from '../../../shared/handle-error.js';

class CreateNewPaymentHandler {
  async handle(request, response) {
    try {
      const schema = Yup.object().shape({
        document: Yup.string().required('O documento é obrigatório'),
      });

      await schema.validate(request.body, { abortEarly: false });

      const { document } = request.body;

      const isValidCpfCnpj = validateCpfCnpj(document);

      if (!isValidCpfCnpj) {
        throw 'CPF ou CNPJ inválido';
      }

      const cpfCnpj = document.replace(/\D/g, '');

      const result = await new CreateNewPaymentSvc().execute(cpfCnpj);

      return response.status(200).json(result);
    } catch (err) {
      const message = handleError(err);
      return response.status(400).json({
        error: true,
        message,
      });
    }
  }
}

const createNewPaymentHandle = new CreateNewPaymentHandler();
export default createNewPaymentHandle;
