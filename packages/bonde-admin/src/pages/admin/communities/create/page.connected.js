//
// @route /community/new
//
import { reduxForm } from 'redux-form'
import { injectIntl } from 'react-intl'
import * as CommunityActions from 'community/action-creators'

import Page from './page'

const validate = (values, { intl }) => {
  const error = {}
  if (!values.name) {
    error.name = intl.formatMessage({
      id: 'page--community-new.form.name.validation.required',
      defaultMessage: 'Informe o nome da comunidade'
    })
  }
  if (!values.city) {
    error.city = intl.formatMessage({
      id: 'page--community-new.form.city.validation.required',
      defaultMessage: 'Informe em qual cidade sua comunidade atua'
    })
  }
  return error
}

export default injectIntl(reduxForm({
  form: 'communityNewForm',
  fields: ['name', 'city'],
  validate
}, undefined, CommunityActions)(Page))
