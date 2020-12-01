import React, { useEffect, useState } from 'react';
import { useMutation, gql } from 'bonde-core-tools';
import { Loading, Header, Text } from 'bonde-components';
import { useHistory, useLocation } from 'react-router-dom';

const InvalidURL = () => (
  <>
    <Header.H2>Opa!</Header.H2>
    <Text>Esse link é inválido ou já expirou. Entre em contato com a comunidade e peça para te enviarem um novo convite.</Text>
    <Text>Se o erro persistir, envie um email para <a href="mailto:suporte@bonde.org">suporte@bonde.org</a> com o nome da comunidade que você está tentando acessar.</Text>
    <Text>Te responderemos o quanto antes :)</Text>
  </>
)


const registerVerifyMutation = gql`
  mutation RegisterVerify ($code: String!, $email: String!) {
    register_verify(code: $code, email: $email) {
      code
      email
      isNewUser
    }
  }
`

export type RegisterVerify = {
  data?: {
    register_verify: {
      code: string;
      email: string;
      isNewUser: boolean;
    }
  }
}

const Verify = ({ children }: any) => {
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState(undefined);
  
  const [verify] = useMutation(registerVerifyMutation);
  const location = useLocation();
  const history = useHistory();
  
  useEffect(() => {
    // Get variables on URL
    const params = new URLSearchParams(location.search);
    const variables = {
      code: params.get('code'),
      email: params.get('email')
    };

    verify({ variables })
      .then(({ data }: RegisterVerify) => {
        if (data && !data.register_verify.isNewUser) {
          history.push('/login');
        }
        setSuccess(true);
      })
      .catch((err: any) => {
        setErrors(err.message);
      });
  }, [verify, history, location.search]);

  // This code is a first check to render
  if (errors) return <InvalidURL />;
  
  if (!success) return <Loading message="Verificando o link" />;
  
  return children;
}

export default Verify;