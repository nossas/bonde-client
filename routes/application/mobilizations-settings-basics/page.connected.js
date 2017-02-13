import { provideHooks } from 'redial'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import * as MobilizationSelectors from '~mobilizations/selectors'
import * as MobilizationActions from '~mobilizations/action-creators'
import { fields, validate } from '~mobilizations/components/mobilization-basics-form'

import MobilizationsSettingsBasicsPage from './page'

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

export default provideHooks(redial)(
  connect(mapStateToProps, mapActionCreatorsToProps)(
    reduxForm({
      form: 'mobilizationBasicsForm',
      fields: [...fields, 'id'],
      validate
    })(MobilizationsSettingsBasicsPage)
  )
)
