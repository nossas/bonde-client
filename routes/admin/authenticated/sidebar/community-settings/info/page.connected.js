import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import { asyncEdit } from '~client/community/action-creators'
import * as CommunitySelectors from '~client/community/selectors'
import { isValidFromEmail } from '~client/utils/validation-helper'

import Page from './page'

const mapStateToProps = state => {
  const community = CommunitySelectors.getCurrent(state)
  return {
    community,
    initialValues: { ...community }
  }
}

const mapDispatchToProps = { submit: asyncEdit }

const fields = [
  'id', 'image', 'name', 'city', 'description', 'email_template_from'
]

const validate = ({ name, city, email_template_from: customFromEmail }) => {
  const errors = {}

  if (!name) {
    errors.name = 'Informe o nome da comunidade'
  }
  if (!city) {
    errors.city = 'Informe em qual cidade sua comunidade atua'
  }
  if (customFromEmail && !isValidFromEmail(customFromEmail)) {
    errors.email_template_from = 'E-mail de resposta fora do formato padrão'
  }
  return errors
}

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({ form: 'communityInfoForm', fields, validate })(Page)
)
