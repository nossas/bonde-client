import React from 'react'
import {
  Button,
  Flexbox2 as Flexbox,
  Modal,
  Title,
  Text
} from 'bonde-styleguide'
import { FormGraphQL, resetForm } from 'components/Form'
import ChatbotAPI from '../graphql'
import queryBuilder from '../queryBuilder'


export default ({ workflow, nodeData, onClose }) => {
  const conversationQuery = queryBuilder(20)
  
  const handleCloseModal = () => {
    // Should resetForm always close modal
    resetForm()
    onClose()
  }

  return (
    <Modal
      opened={!!nodeData}
      onClose={handleCloseModal}
    >
      <Flexbox vertical>
        <FormGraphQL
          mutation={ChatbotAPI.mutation.deleteWorkflowMessage}
          refetchQueries={[{
            query: conversationQuery,
            variables: { id: workflow.node.id }
          }]}
          onSubmit={(values, mutation) => {
            return mutation({ variables: { id: nodeData.uuid }})
              .then(() => {
                handleCloseModal()
              })
          }}
        >
          <Title.H3 margin={{ bottom: 10 }}>Certeza que deseja remover:</Title.H3>
          <Text>{nodeData.text}</Text>
          <Flexbox middle spacing='between' margin={{ top: 15 }}>
            <Button flat onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button type="submit">Deletar</Button>
          </Flexbox>
        </FormGraphQL>
      </Flexbox>
    </Modal>
  )
}