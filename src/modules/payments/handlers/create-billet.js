import CreateBilletPaymentSvc from '../services/create-billet.js';

class CreateBilletPaymentHandler {
  async handle(request, response) {
    const { customerId, value } = request.body;
    const result = await new CreateBilletPaymentSvc().execute(
      customerId,
      value
    );

    return response.status(201).json(result);
  }
}

const createBilletPaymentHandle = new CreateBilletPaymentHandler();
export default createBilletPaymentHandle;
