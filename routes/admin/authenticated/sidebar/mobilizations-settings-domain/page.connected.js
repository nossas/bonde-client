import { provideHooks } from 'redial'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import MobSelectors from '~client/mobrender/redux/selectors'
import * as MobActions from '~client/mobrender/redux/action-creators'
import { isValidDomain } from '~client/utils/validation-helper'

import Page from './page'

const redial = {
  fetch: ({ dispatch, getState, params }) => {
    const state = getState()
    const promises = []

    !MobSelectors(state).hasCurrentMobilization() && promises.push(
      dispatch(MobActions.selectMobilization(params.mobilization_id))
    )
    return Promise.all(promises)
  }
}

export const fields = ['id', 'custom_domain']

export const validate = values => {
  const errors = {}
  if (values.custom_domain && !isValidDomain(values.custom_domain)) {
    errors.custom_domain = 'Informe um domínio válido'
  }
  return errors
}

const mapStateToProps = state => {
  const mobilization = MobSelectors(state).getMobilization()
  return {
    initialValues: mobilization,
    mobilization
  }
}

const mapActionCreatorsToProps = {
  submit: MobActions.asyncUpdateMobilization
}

export default provideHooks(redial)(
  connect(mapStateToProps, mapActionCreatorsToProps)(
    reduxForm({ form: 'mobilizationSettingsDomainForm', fields, validate })(Page)
  )
)
