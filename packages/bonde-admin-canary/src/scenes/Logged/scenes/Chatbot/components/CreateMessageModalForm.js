import React from 'react'
import {
  Button,
  Flexbox2 as Flexbox,
  FormField,
  Modal,
  Select,
  Title,
  Text,
  Textarea
} from 'bonde-styleguide'
import { FormGraphQL, Field, SubmitButton, resetForm } from 'components/Form'
import { required } from 'services/validations'
import ChatbotAPI from '../graphql'
import queryBuilder from '../queryBuilder'
import PropTypes from 'prop-types'

const CreateMessageModalForm = ({ nodeData, onClose, campaign }) => {
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
          mutation={ChatbotAPI.mutation.createMessage}
          refetchQueries={[{
            query: conversationQuery,
            variables: { id: campaign.node.id }
          }]}
          onSubmit={(values, mutation) => {
            const variables = { ...values, parentId: Number(nodeData.uuid) }
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
            name='kind'
            label='Tipo de mensagem'
            component={FormField}
            inputComponent={(props) => {
              return (
                <Select native {...props}>
                  <option value='TALK'>texto</option>
                  <option value='REPLY'>resposta</option>
                  <option value='GIF'>gif</option>
                </Select>
              )
            }}
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

CreateMessageModalForm.propTypes = {
  nodeData: PropTypes.shape({
    uuid: PropTypes.string
  }),
  campaign: PropTypes.shape({
    node: PropTypes.shape({
      id: PropTypes.string
    })
  }),
  onClose: PropTypes.func
}

export default CreateMessageModalForm
