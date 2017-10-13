import { provideHooks } from 'redial'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { injectIntl } from 'react-intl'

import { selectMobilization } from '~client/mobrender/redux/action-creators'
import MobSelectors from '~client/mobrender/redux/selectors'
import * as TemplateActions from '~client/mobilizations/templates/action-creators'

import Page from './page'

const redial = {
  fetch: ({ dispatch, getState, params }) => {
    const state = getState()
    const promises = []

    !MobSelectors(state).getMobilization() && promises.push(
      dispatch(selectMobilization(params.mobilization_id))
    )
    return Promise.all(promises)
  }
}

const mapStateToProps = state => {
  const mobilization = MobSelectors(state).getMobilization()
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
    })(injectIntl(Page))
  )
)
