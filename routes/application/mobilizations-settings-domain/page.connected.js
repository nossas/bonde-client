import { provideHooks } from 'redial'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import * as MobilizationSelectors from '~mobilizations/selectors'
import * as MobilizationActions from '~mobilizations/action-creators'
import { isValidDomain } from '~utils/validation-helper'

import MobilizationsSettingsDomainPage from './page'

const redial = {
  fetch: ({ dispatch, getState, params }) => {
    const state = getState()
    const promises = []

    !MobilizationSelectors.hasCurrent(state) && promises.push(
      dispatch(MobilizationActions.select(params.mobilization_id))
    )
    return Promise.all(promises)
  }
}

const mapStateToProps = state => {
  const mobilization = MobilizationSelectors.getCurrent(state)
  return {
    initialValues: mobilization,
    mobilization
  }
}

const mapActionCreatorsToProps = {
  submit: MobilizationActions.asyncUpdate
}

const validate = values => {
  const errors = {}
  if (values.custom_domain && !isValidDomain(values.custom_domain)) {
    errors.custom_domain = 'Informe um domínio válido'
  }
  return errors
}

export default provideHooks(redial)(
  connect(mapStateToProps, mapActionCreatorsToProps)(
    reduxForm({
      form: 'mobilizationDomainForm',
      fields: ['id', 'custom_domain'],
      validate
    })(MobilizationsSettingsDomainPage)
  )
)
