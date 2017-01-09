import React from 'react'
import { reduxForm } from 'redux-form'
import { edit } from '../actions'

import {
  FormRedux,
  SubmitButton,
  FormGroup,
  FormControl,
  ControlLabel,
  UploadImageField,
  SuccessMessage
} from '../../Dashboard/Forms'
import { FloatLayout } from '../../Dashboard/Grids'

const MailchimpPage = ({ fields: { mailchimp_api_key, mailchimp_list_id, mailchimp_group_id }, ...formProps }) => (
  <FormRedux nosubmit {...formProps}>
    <FormGroup controlId='apiKeyId' {...mailchimp_api_key}>
      <ControlLabel>Mailchimp API Key</ControlLabel>
      <FormControl type='text' />
    </FormGroup>
    <FormGroup controlId='listId' {...mailchimp_list_id}>
      <ControlLabel>Mailchimp ID da lista</ControlLabel>
      <FormControl type='text' />
    </FormGroup>
    <FormGroup controlId='groupId' {...mailchimp_group_id}>
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
