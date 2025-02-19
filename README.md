# P-Pay API (desafio perfect-pay)

## Para rodar o projeto

Requisitos:

- node v23.7.0
- npm v10.9.2

Em uma instância do terminal execute os seguintes comandos:

- Faça o clone do repositório

```
git clone https://github.com/adrianomantovani/p-pay-api.git
```

- Acesse a pasta p-pay-api

```
cd p-pay-api
```

- Instale as dependências

```
npm install
```

- Inicie a aplicação

```
npm start
```

A aplicação será iniciada e estará ouvindo na porta 3333
(Server started on port: 3333 🚀)
O banco de dados (sqlite3) da aplicação é criado no arquivo /development.db

## Rotas da aplicação

### POST /clients/start

Pode ser usada para encaminhar o cliente para a "home"

- Faz a criação do cliente ou carrega o cliente já existente com o documento informado.
- Exibe as informações do cliente e o pagamento pendente (se houver)

Request body example:

```
{
    "document": "string",
    "name": "string"
}
```

Response body example:

```
{
    "document": "string",
    "name": "string",
    "customerId": "string",
    "pendingPayment": {
        "message": "string",
        "type": "string", ['billet', 'qrcode', 'creditcard']
        "value": number,
        "id": "string",
        "url": "string", | null
        "encodedImage": string, | null
        "payload": "string" | null
    }
}
```

### POST /clients/new-payment

Permite o cliente voltar para a "home" e poder criar um novo pagamento.

- Cancela os pagamentos pendentes do cliente, a fim de permitir a criação de um novo pagamento, e exibe o empty-state de pagamentos pendentes

Request body example:

```
{
    "document": "string"
}
```

Response body example:

```
{
    "document": "string",
    "name": "string",
    "customerId": "string",
    "pendingPayment": null
}
```

### POST /payments/pix

- Cria um novo pagamento por pix/qrcode;
- Exibe o qrcode e o texto "copia e cola" do pagamento criado.

Request body example:

```
{
    "customerId": "string",
    "value": number,
}
```

Response body example:

```
{
    "success": boolean,
    "message": "string",
    "id": "string",
    "encodedImage": "string",
    "payload: "string",
    "allowsMultiplePayments": boolean,
    "expirationDate": "string",
    "externalReference": "string"
}
```

### POST /payments/billet

- Cria um novo pagamento por boleto e exibe a url para visualizar as informações

Request body example:

```
{
    "customerId": "string",
    "value": number,
}
```

Response body example:

```
{
    "success": boolean,
    "message": "string",
    "url": "string"
}
```

### POST /payments/credit-card

- Cria um novo pagamento por cartão de crédito

Request Body example

```
{
    "customerId": "string",
    "value": number,
    "creditCard": {
        "holderName": "string",
        "number": "string",
        "expiryMonth": "string",
        "expiryYear": "string",
        "ccv": "string"
    },
    "creditCardHolderInfo": {
        "name": "string",
        "email": "string",
        "cpfCnpj": "string",
        "postalCode": "string",
        "addressNumber": "string",
        "phone": "string"
    }
}
```

Response body example:

```
{
    "success": boolean,
    "message": "string",
    "paymentId": "string"
}
```

## Testes da aplicação

Os testes de integração foram criados a fim de verificar se todas as tabelas do banco de dados foram criadas corretamente (no schema correto definido)

Para executar o teste:

```
npm test
```
