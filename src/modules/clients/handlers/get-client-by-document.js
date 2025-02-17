import { getClientByDocument } from '../../../database/repositories/clients.js';

class GetClientByDocument {
  async handle(request, response) {
    const { doc } = request.params;

    const result = getClientByDocument(doc);

    return response.json(result);
  }
}

const getClientByDocumentHandle = new GetClientByDocument();
export default getClientByDocumentHandle;
