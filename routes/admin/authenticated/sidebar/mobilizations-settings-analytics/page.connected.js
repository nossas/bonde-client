import { provideHooks } from 'redial'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import MobSelectors from '~client/mobrender/redux/selectors'
import * as MobActions from '~client/mobrender/redux/action-creators'
import { isValidCodeGA } from '~client/utils/validation-helper'

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

const validate = values => {
  const errors = {}
  if (values.google_analytics_code && !isValidCodeGA(values.google_analytics_code)) {
    errors.google_analytics_code = 'Informe uma ID válida'
  }
  return errors
}

export default provideHooks(redial)(
  connect(mapStateToProps, mapActionCreatorsToProps)(
    reduxForm({
      form: 'mobilizationAnalyticsForm',
      fields: ['id', 'google_analytics_code'],
      validate
    })(Page)
  )
)
