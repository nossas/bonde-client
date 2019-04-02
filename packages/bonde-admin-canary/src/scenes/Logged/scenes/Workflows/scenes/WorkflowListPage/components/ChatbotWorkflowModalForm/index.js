import React from 'react'
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
import chatbotWorkflowsQuery from '../ChatbotWorkflowList/query.graphql'
import chatbotCreateWorkflowMutation from './mutation.graphql'

// TODO: Select configuration id by user
const FACEBOOK_BOT_CONFIGURATION = {
  id: 1,
  communityId: 1
}

export default class extends React.Component {

  state = { opened: false }

  handleCloseModalForm () {
    // Should resetForm always close modal
    this.setState({ opened: false })
    resetForm()
  }

  render () {
    return (
      <React.Fragment>
        <Button onClick={() => this.setState({ opened: true })}>
          Criar fluxo de conversa
        </Button>
        <Modal
          opened={this.state.opened}
          onClose={this.handleCloseModalForm.bind(this)}
        >
          <Flexbox vertical align='middle' margin={{ bottom: 20 }}>
            <Title.H3 align='center' margin={{ bottom: 25 }}>Vamos lá!</Title.H3>
            <Text align='center'>Comece dando um nome para acessar seu fluxo de conversa depois:</Text>
          </Flexbox>
          <Flexbox vertical>
            <FormGraphQL
              mutation={chatbotCreateWorkflowMutation}
              update={(cache, { data: { chatbotCreateWorkflow: { workflow } }}) => {
                const { chatbotWorkflows } = cache.readQuery({
                  query: chatbotWorkflowsQuery,
                  variables: { communityId: FACEBOOK_BOT_CONFIGURATION.communityId }
                })
                // TODO: Check simpler way to work with typing in graphql
                chatbotWorkflows.edges.push({ node: workflow, __typename: 'WorkflowTypeEdge' })
                cache.writeQuery({ query: chatbotWorkflowsQuery, data: { chatbotWorkflows } })
              }}
              refetchQueries={[{
                query: chatbotWorkflowsQuery,
                variables: { communityId: FACEBOOK_BOT_CONFIGURATION.communityId }
              }]}
              onSubmit={(values, mutation) => {
                return mutation({ variables: {...values, configurationId: FACEBOOK_BOT_CONFIGURATION.id }})
                  .then(() => {
                    this.handleCloseModalForm()
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
                name='message'
                label='Primeira mensagem'
                placeholder='Escreva a primeira mensagem aqui (você poderá editar depois)'
                component={FormField}
                inputComponent={Textarea}
                validate={required('Primeira mensagem deve ser preenchida.')}
              />
              <Flexbox middle spacing='between'>
                <Button flat onClick={this.handleCloseModalForm.bind(this)}>
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
}