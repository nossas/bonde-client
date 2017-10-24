import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { injectIntl } from 'react-intl'
import { isValidFromEmail } from '~client/utils/validation-helper'
import Page from './page'

const fields = ['name', 'subject', 'sender', 'content']

const validate = (values, { intl }) => {
  const errors = {}

  const requiredMessage = intl.formatMessage({
    id: 'page--communication.form.required-field',
    defaultMessage: 'Preenchimento obrigatório'
  })

  if (!values.name) {
    errors.name = requiredMessage
  }
  if (!values.subject) {
    errors.subject = requiredMessage
  }
  if (!values.sender) {
    errors.sender = requiredMessage
  } else if (!isValidFromEmail(values.sender)) {
    errors.sender = intl.formatMessage({
      id: 'page--communication.form.invalid-sender',
      defaultMessage: 'Formato de remetente inválido'
    })
  }
  return errors
}

const mapActionsToProps = (dispatch) => ({
  submit: (values) => {
    console.log('onSubmit', values)
  }
})

export default injectIntl(
  connect(undefined, mapActionsToProps)(
    reduxForm({ form: 'createCommunicationForm', fields, validate })(Page)
  )
)
