import React from 'react'
import gql from 'graphql-tag'
import { useMutation, useSession } from 'bonde-core-tools'
import { toast } from 'react-toastify'
import {
  Button,
  ConnectedForm,
  InputField,
  Validators
  // Hint
} from 'bonde-components'

// {
//   "input": {
//     "name": "Teste IGOR",
//       "city": "Cidade Imaginaria",
//         "community_users": {
//       "data": {
//         "user_id": 152,
//           "role": 1
//       }
//     }
//   }
// }

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
  const [insertCommunity] = useMutation(InsertCommunityMutation)
  const { user } = useSession()

  const { required } = Validators
  const initialValues = {
    community_users: {
      data: {
        user_id: user.id,
        role: 1
      }
    }
  }

  return (
    <ConnectedForm
      initialValues={initialValues}
      onSubmit={(values, form) => {
        insertCommunity({ variables: { input: values } })
          .then(() => {
            toast(`Parabéns, a comunidade ${values.name} foi adicionada ao Bonde`, { type: toast.TYPE.SUCCESS })
            form.reset()
          })
          .catch(({ graphQLErrors, ...errors }) => {
            if (graphQLErrors && graphQLErrors.filter(err => err.extensions.code === 'permission-error').length > 0) {
              toast('Ops! Seu usuário não possui permissão para essa ação, qualquer dúvida entre em contato pelo suporte.', { type: toast.TYPE.ERROR })
            } else {
              console.error({ graphQLErrors, ...errors })
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
  )
}

export default CommunityForm
