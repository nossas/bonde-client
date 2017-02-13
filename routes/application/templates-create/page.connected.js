import { provideHooks } from 'redial'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import * as MobilizationActions from '~mobilizations/action-creators'
import * as MobilizationSelectors from '~mobilizations/selectors'
import * as TemplateActions from '~mobilizations/templates/action-creators'

import TemplatesCreatePage from './page'

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
    mobilization,
    initialValues: {
      mobilization_id: mobilization.id,
      global: false
    }
  }
}

const mapActionCreatorsToProps = {
  submit: TemplateActions.asyncCreateTemplate
}

export default provideHooks(redial)(
  connect(mapStateToProps, mapActionCreatorsToProps)(
    reduxForm({
      form: 'templateCreateForm',
      fields: ['name', 'goal', 'mobilization_id', 'global']
    })(TemplatesCreatePage)
  )
)
