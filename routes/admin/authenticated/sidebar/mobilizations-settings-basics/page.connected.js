import { provideHooks } from 'redial'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { injectIntl } from 'react-intl'
import MobSelectors from '~client/mobrender/redux/selectors'
import * as MobActions from '~client/mobrender/redux/action-creators'
import { fields, validate } from '~client/mobilizations/components/mobilization-basics-form'

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

const form = 'mobilizationBasicsForm'

const mapStateToProps = state => {
  const mobilization = MobSelectors(state).getMobilization()
  return {
    formName: form,
    initialValues: mobilization,
    mobilization
  }
}

const mapActionCreatorsToProps = {
  submit: MobActions.asyncUpdateMobilization
}

export default provideHooks(redial)(
  connect(mapStateToProps, mapActionCreatorsToProps)(
    injectIntl(reduxForm({ form, fields: [...fields, 'id'], validate })(Page))
  )
)
