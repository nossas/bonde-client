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
import queryBuilder from '../queryBuilder'


export default ({ nodeData, onClose, workflow }) => {
  const remount = Number(workflow.node.lastLevel) < Number(nodeData.level)
  const conversationQuery = queryBuilder(remount ? Number(nodeData.level) : Number(workflow.node.lastLevel))
  
  const handleCloseModalForm = () => {
    // Should resetForm always close modal
    resetForm()
    onClose()
  }

  return (
    <Modal
      opened={!!nodeData}
      onClose={handleCloseModalForm}
    >
      <Flexbox vertical align='middle' margin={{ bottom: 20 }}>
        <Title.H3 align='center' margin={{ bottom: 25 }}>Vamos lá!</Title.H3>
        <Text align='center'>Comece dando um nome para acessar seu fluxo de conversa depois:</Text>
      </Flexbox>
      <Flexbox vertical>
        <FormGraphQL
          mutation={ChatbotAPI.mutation.createWorkflowMessage}
          refetchQueries={[{
            query: conversationQuery,
            variables: { id: workflow.node.id }
          }]}
          onSubmit={(values, mutation) => {
            const variables = {...values, parentId: Number(nodeData.uuid)}
            return mutation({ variables })
              .then(() => {
                handleCloseModalForm()
              })
          }}
        >
          <Field
            name='text'
            label='Mensagem'
            placeholder='Insira sua mensagem'
            component={FormField}
            inputComponent={Textarea}
            validate={required('Mensagem deve ser preenchida.')}
          />
          <Field
            name='action'
            label='Tipo de mensagem'
            placeholder='GET_STARTED || TALK || REPLY'
            component={FormField}
            inputComponent={Input}
            validate={required('Tipo de mensagem deve ser preenchido.')}
          />
          <Flexbox middle spacing='between'>
            <Button flat onClick={handleCloseModalForm}>
              Cancelar
            </Button>
            <SubmitButton>Adicionar mensagem</SubmitButton>
          </Flexbox>
        </FormGraphQL>
      </Flexbox>
    </Modal>
  )
}