import { cpf, cnpj } from 'cpf-cnpj-validator';

export default function validateCpfCnpj(cpfCnpj) {
  const cpfStr = cpfCnpj;
  const cnpjStr = cpfCnpj;

  const isValidCpf = cpf.isValid(cpfStr);
  const isValidCnpj = cnpj.isValid(cnpjStr);

  if (!isValidCpf && !isValidCnpj) return false;

  return true;
}
