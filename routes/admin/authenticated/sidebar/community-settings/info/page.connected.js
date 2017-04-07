import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import { asyncEdit } from '~client/community/action-creators'
import * as CommunitySelectors from '~client/community/selectors'

import Page from './page'

const mapStateToProps = state => {
  const community = CommunitySelectors.getCurrent(state)
  return {
    community,
    initialValues: { ...community }
  }
}

const mapDispatchToProps = { submit: asyncEdit }

const fields = ['id', 'image', 'name', 'city', 'description']

const validate = values => {
  const errors = {}

  if (!values.name) {
    errors.name = 'Informe o nome da comunidade'
  }
  if (!values.city) {
    errors.city = 'Informe em qual cidade sua comunidade atua'
  }
  return errors
}

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({ form: 'communityInfoForm', fields, validate })(Page)
)
