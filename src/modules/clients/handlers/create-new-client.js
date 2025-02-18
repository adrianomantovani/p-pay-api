import * as Yup from 'yup';
import CreateNewClientSvc from '../services/create-new-client.js';

class CreateNewClientHandler {
  async handle(request, response, next) {
    try {
      const schema = Yup.object().shape({
        document: Yup.string().required(),
        name: Yup.string().required(),
        password: Yup.string().required(),
      });

      await schema.validate(request.body, { abortEarly: false });

      const { document, name, password } = request.body;

      const result = await new CreateNewClientSvc().execute(
        document,
        name,
        password
      );

      return response.status(201).json(result);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        err.name = 'ValidationError';
      }
      next(err);
    }
  }
}

const createNewClientHandle = new CreateNewClientHandler();
export default createNewClientHandle;
