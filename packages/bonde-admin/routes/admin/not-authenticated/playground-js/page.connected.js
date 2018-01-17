import { reduxForm } from 'redux-form'
import Page from './page'

const fields = ['domain']

const validate = values => {
  const errors = {}
  if (!values.domain) {
    errors.domain = 'Domínio é obrigatório.'
  }
  return errors
}

export default reduxForm({ form: 'domainForm', fields, validate })(Page)
