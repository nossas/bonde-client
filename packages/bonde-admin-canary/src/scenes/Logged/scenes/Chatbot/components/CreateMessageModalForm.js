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

const updateTree = (id, update, tree) => {
  if (Number(tree.node.id) === Number(id)) {
    if (tree.node.children === undefined) {
      tree.node.children = { edges: [{ node: update }] }
    } else {
      tree.node.children.edges = [{ node: update }]
    }
  } else if (tree.node.children && tree.node.children.edges.length > 0) {
    tree.node.children.edges = tree.node.children.edges.map(item => {
      return updateTree(id, update, item)
    })
  }
  return tree
}

export default ({ nodeData, onClose, workflow }) => {
  const conversationQuery = queryBuilder(20)

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
