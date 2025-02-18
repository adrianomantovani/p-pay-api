import * as Yup from 'yup';
import CreateNewClientSvc from '../services/create-new-client.js';

class CreateNewClientHandler {
  async handle(request, response) {
    try {
      const schema = Yup.object().shape({
        document: Yup.string().required('O documento é obrigatório'),
        name: Yup.string().required('O nome é obrigatório'),
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
      return response.status(400).json({
        error: true,
        message: err.errors[0],
      });
    }
  }
}

const createNewClientHandle = new CreateNewClientHandler();
export default createNewClientHandle;
