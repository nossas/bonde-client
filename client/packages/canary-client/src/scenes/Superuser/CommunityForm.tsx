import React from 'react';
import { useMutation, useSession, gql } from 'bonde-core-tools';
import {
  Button,
  ConnectedForm,
  InputField,
  Validators,
  toast
} from 'bonde-components';

const InsertCommunityMutation = gql`
  mutation InsertCommunities($input: [communities_insert_input!]!) {
    insert_communities(objects: $input) {
      returning {
        id
        name
        description
        city
        created_at
        updated_at
        community_users {
          user {
            first_name
          }
          role
        }
      }
    }
  }
`

const CommunityForm = () => {
  const [insertCommunity] = useMutation(InsertCommunityMutation);
  const { user } = useSession();

  const { required } = Validators;
  const initialValues = {
    community_users: {
      data: {
        user_id: user.id,
        role: 1
      }
    }
  };

  return (
    <ConnectedForm
      initialValues={initialValues}
      onSubmit={(values: any) => {
        insertCommunity({ variables: { input: values } })
          .then(() => {
            // TODO: i18n
            toast(`Parabéns, a comunidade ${values.name} foi adicionada ao Bonde`, { type: toast.TYPE.SUCCESS });
          })
          .catch(({ graphQLErrors, ...errors }) => {
            if (graphQLErrors && graphQLErrors.filter((err: any) => err.extensions.code === 'permission-error').length > 0) {
              toast('Ops! Seu usuário não possui permissão para essa ação, qualquer dúvida entre em contato pelo suporte.', { type: toast.TYPE.ERROR });
            } else {
              console.error({ graphQLErrors, ...errors });
            }
          })
      }}
    >
      {({ submitting }) => (
        <>
          <InputField
            name='name'
            label='Nome'
            placeholder='Insira o nome da comunidade'
            validate={required('Preencha o nome da comunidade')}
          />
          <InputField
            name='city'
            label='Cidade'
            placeholder='Insira a cidade da comunidade'
          />
          <InputField
            name='description'
            label='Sobre a comunidade'
            placeholder='Insira uma breve descrição sobre o que está comunidade faz'
          />
          <Button type='submit' disabled={submitting}>Criar comunidade</Button>
        </>
      )}
    </ConnectedForm>
  );
};

export default CommunityForm;
