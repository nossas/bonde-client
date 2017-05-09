import { reduxForm } from 'redux-form'

import * as CommunityActions from '~client/community/action-creators'

import Page from './page'

const validate = (values) => {
  const error = {}
  if (!values.name) {
    error.name = 'Informe o nome da comunidade'
  }
  if (!values.city) {
    error.city = 'Informe em qual cidade sua comunidade atua'
  }
  return error
}

export default reduxForm({
  form: 'communityNewForm',
  fields: ['name', 'city'],
  validate
}, undefined, CommunityActions)(Page)
