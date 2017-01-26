import React from 'react'
import { reduxForm } from 'redux-form'
import { edit } from '../actions'

// Global module dependencies
import {
  FormRedux,
  SubmitButton,
  FormGroup,
  FormControl,
  ControlLabel,
  SuccessMessage
} from '~components/forms'
import { FloatLayout } from '~tmp-dashboard/Grids'

const MailchimpPage = ({
  fields: {
    mailchimp_api_key: mailchimpApiKey,
    mailchimp_list_id: mailchimpListId,
    mailchimp_group_id: mailchimpGroupId
  },
  ...formProps
}) => (
  <FormRedux nosubmit {...formProps}>
    <FormGroup controlId='apiKeyId' {...mailchimpApiKey}>
      <ControlLabel>Mailchimp API Key</ControlLabel>
      <FormControl type='text' />
    </FormGroup>
    <FormGroup controlId='listId' {...mailchimpListId}>
      <ControlLabel>Mailchimp ID da lista</ControlLabel>
      <FormControl type='text' />
    </FormGroup>
    <FormGroup controlId='groupId' {...mailchimpGroupId}>
      <ControlLabel>Mailchimp ID do grupo</ControlLabel>
      <FormControl type='text' />
    </FormGroup>

    <FloatLayout position='floatTopRight'>
      <SubmitButton>Salvar</SubmitButton>
      <SuccessMessage text='Dados editados com sucesso.' />
    </FloatLayout>
  </FormRedux>
)

const fields = ['id', 'mailchimp_api_key', 'mailchimp_list_id', 'mailchimp_group_id']

const mapStateToProps = (state, ownProps) => ({
  initialValues: { ...ownProps.community }
})

export default reduxForm({
  form: 'mailchimpForm',
  fields
}, mapStateToProps, { submit: edit })(MailchimpPage)
