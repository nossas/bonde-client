import { provideHooks } from 'redial'
import { connect } from 'react-redux'

import MobSelectors from '~client/mobrender/redux/selectors'
import { selectMobilization } from '~client/mobrender/redux/action-creators'
import * as TemplateActions from '~mobilizations/templates/action-creators'
import * as TemplateSelectors from '~mobilizations/templates/selectors'

import Page from './page'

const redial = {
  fetch: ({ dispatch, getState, params }) => {
    const state = getState()
    const promises = []

    // TODO: Check if this code is necessary
    !MobSelectors(getState()).getMobilization() && promises.push(
      dispatch(selectMobilization(params.mobilization_id))
    )
    !TemplateSelectors.isLoaded(state) && promises.push(
      dispatch(TemplateActions.asyncFetch())
    )
    return Promise.all(promises)
  }
}

const mapStateToProps = state => ({
  mobilization: MobSelectors(state).getMobilization(),
  templatesGlobalLength: TemplateSelectors.getGlobalTemplates(state).length,
  templatesCustomLength: TemplateSelectors.getCustomTemplates(state).length
})

export default provideHooks(redial)(connect(mapStateToProps)(Page))
