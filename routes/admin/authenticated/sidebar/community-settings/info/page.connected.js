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
  'id', 'image', 'name', 'city', 'description', 'custom_from_email'
]

const validate = ({ name, city, custom_from_email: customFromEmail }) => {
  const errors = {}

  if (!name) {
    errors.name = 'Informe o nome da comunidade'
  }
  if (!city) {
    errors.city = 'Informe em qual cidade sua comunidade atua'
  }
  if (customFromEmail && !isValidFromEmail(customFromEmail)) {
    errors.custom_from_email = 'E-mail de resposta fora do formato padrão'
  }
  return errors
}

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({ form: 'communityInfoForm', fields, validate })(Page)
)
