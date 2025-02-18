import * as Yup from 'yup';

import CreateCreditCardPaymentSvc from '../services/create-credit-card.js';
import validateCpfCnpj from '../../../shared/validate-cpf-cnpj.js';
import handleError from '../../../shared/handle-error.js';

class CreateCreditCardPaymentHandler {
  async handle(request, response) {
    try {
      const schema = Yup.object().shape({
        customerId: Yup.string().required('customerId é obrigatório'),
        value: Yup.number().required('O valor é obrigatório'),
        creditCard: Yup.object().shape({
          holderName: Yup.string().required(),
          number: Yup.string()
            .matches(/^\d+$/, 'O número do cartão deve conter apenas dígitos')
            .min(13, 'O número do cartão deve ter no mínimo 13 caracteres')
            .required(),
          expiryMonth: Yup.string()
            .matches(
              /^(0[1-9]|1[0-2])$/,
              'o mês de expiração deve ser um mês válido com 2 caracteres'
            )
            .required(),
          expiryYear: Yup.string()
            .matches(/^\d{4}$/, 'O ano deve ter 4 dígitos')
            .required(),
          ccv: Yup.string()
            .matches(/^\d+$/, 'O cvv deve conter apenas dígitos')
            .min(3, 'cvv deve ser um número válido')
            .max(4, 'cvv deve ser um número válido')
            .required(),
        }),
        creditCardHolderInfo: Yup.object().shape({
          name: Yup.string().required(),
          email: Yup.string().email('E-mail inválido').required(),
          cpfCnpj: Yup.string().required(),
          postalCode: Yup.string()
            .matches(/^\d{8}$/, 'O CEP deve conter exatamente 8 dígitos')
            .required(),
          addressNumber: Yup.string().required(),
          phone: Yup.string()
            .matches(/^\d+$/, 'O telefone deve conter apenas números')
            .required(),
        }),
      });

      await schema.validate(request.body, { abortEarly: false });

      const { customerId, value, creditCard, creditCardHolderInfo } =
        request.body;

      const { cpfCnpj } = creditCardHolderInfo;
      const isValidCpfCnpj = validateCpfCnpj(cpfCnpj);

      if (!isValidCpfCnpj) {
        throw 'CPF ou CNPJ inválido';
      }

      const result = await new CreateCreditCardPaymentSvc().execute(
        customerId,
        value,
        creditCard,
        creditCardHolderInfo
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

const createCreditCardPaymentHandle = new CreateCreditCardPaymentHandler();
export default createCreditCardPaymentHandle;
