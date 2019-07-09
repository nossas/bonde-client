import React, { useState } from 'react'
import {
  Button,
  Flexbox2 as Flexbox,
  FormField,
  Input,
  Modal,
  Title,
  Text,
  Textarea
} from 'bonde-styleguide'
import { FormGraphQL, Field, SubmitButton, resetForm } from 'components/Form'
import { required } from 'services/validations'
import ChatbotAPI from '../graphql'
import PropTypes from 'prop-types'

const CreateFlowModalForm = ({ t, community }) => {
  const [opened, setOpened] = useState(false)
  const [errors, setErrors] = useState([])
  const [lastValues, setLastValues] = useState({})

  const handleCloseModalForm = () => {
    // Should resetForm always close modal
    setOpened(false)
    resetForm()
  }

  return (
    <React.Fragment>
      <Button onClick={() => setOpened(true)}>
        Criar fluxo de conversa
      </Button>
      <Modal
        opened={opened}
        onClose={handleCloseModalForm}
      >
        <Flexbox vertical align='middle' margin={{ bottom: 20 }}>
          <Title.H3 align='center' margin={{ bottom: 25 }}>Vamos lá!</Title.H3>
          <Text align='center'>Comece dando um nome para acessar seu fluxo de conversa depois:</Text>
        </Flexbox>
        <Flexbox vertical>
          <FormGraphQL
            mutation={ChatbotAPI.mutation.createCampaign}
            update={(cache, { data: { chatbotCreateCampaign } }) => {
              const { campaigns } = cache.readQuery({
                query: ChatbotAPI.query.campaigns,
                variables: { communityId: community.id }
              })
              // TODO: Check simpler way to work with typing in graphql
              campaigns.edges.push({ node: chatbotCreateCampaign.campaign, __typename: 'WorkflowEdge' })
              cache.writeQuery({ query: ChatbotAPI.query.campaigns, data: { campaigns } })
            }}
            refetchQueries={[{
              query: ChatbotAPI.query.campaigns,
              variables: { communityId: community.id }
            }]}
            onSubmit={(values, mutation) => {
              // TODO: discuss how to implement the relationship of configurations, communities and bots
              // chatbotSettingsId = 1 represents BETA the first bot
              return mutation({ variables: { ...values, chatbotSettingsId: 1 } })
                .then(() => {
                  handleCloseModalForm()
                })
                .catch((err) => {
                  setLastValues(values)
                  if (err.graphQLErrors && err.graphQLErrors.length > 0 && err.graphQLErrors[0].message) {
                    setErrors(JSON.parse(err.graphQLErrors[0].message))
                  }
                })
            }}
          >
            <Field
              name='name'
              label='Nome do fluxo'
              placeholder='Escreva aqui o nome do fluxo'
              component={FormField}
              inputComponent={Input}
              validate={required('Nome do fluxo deve ser preenchido.')}
            />
            <Field
              name='prefix'
              label='Identificador'
              placeholder='Identificador usado parI18na agrupar mensagens'
              component={FormField}
              inputComponent={Input}
              validate={
                message => {
                  return required('Identificador deve ser preenchida.')(message) ||
                  (lastValues.prefix === message && t(errors.prefix, { field: 'prefix' }))
                }
              }
            />
            <Field
              name='message'
              label='Primeira mensagem'
              placeholder='Escreva a primeira mensagem aqui (você poderá editar depois)'
              component={FormField}
              inputComponent={Textarea}
              validate={required('Primeira mensagem deve ser preenchida.')}
            />
            <Flexbox middle spacing='between'>
              <Button flat onClick={handleCloseModalForm}>
                Cancelar
              </Button>
              <SubmitButton>Criar fluxo</SubmitButton>
            </Flexbox>
          </FormGraphQL>
        </Flexbox>
      </Modal>
    </React.Fragment>
  )
}

CreateFlowModalForm.propTypes = {
  t: PropTypes.func,
  community: PropTypes.shape({
    id: PropTypes.string
  })
}

export default CreateFlowModalForm
