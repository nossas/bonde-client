import * as CPF from '@fnando/cpf';
import * as CNPJ from '@fnando/cnpj';

type Message = {
  cpf: string
  cnpj: string
}

export const cpfCnpj = ({ cpf, cnpj }: Message) => (value: any) => {
  if (!value) return;
  
  const document = value.replace(/[^\d]/g, '');
  
  if (document.length > 11 && document.length !== 14) return cnpj;
  else if (document.length < 11) return cpf;
  else if (document.length === 11 && !CPF.isValid(document)) {
    return cpf;
  } else if (document.length === 14 && !CNPJ.isValid(document)) {
    return cnpj;
  }
}
