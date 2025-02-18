import * as Yup from 'yup';
import CreateNewClientSvc from '../services/create-new-client.js';
import handleError from '../../../shared/handle-error.js';

class CreateNewClientHandler {
  async handle(request, response) {
    try {
      const schema = Yup.object().shape({
        document: Yup.string().required('O documento é obrigatório'),
        name: Yup.string().required('O nome é obrigatório'),
      });

      await schema.validate(request.body, { abortEarly: false });

      const { document, name } = request.body;

      const result = await new CreateNewClientSvc().execute(document, name);

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

const createNewClientHandle = new CreateNewClientHandler();
export default createNewClientHandle;
