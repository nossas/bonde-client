import { provideHooks } from 'redial'
import { connect } from 'react-redux'

import * as MobilizationActions from '~mobilizations/action-creators'
import * as MobilizationSelectors from '~mobilizations/selectors'
import * as TemplateActions from '~mobilizations/templates/action-creators'
import * as TemplateSelectors from '~mobilizations/templates/selectors'

import TemplatesChoosePage from './page'

const redial = {
  fetch: ({ dispatch, getState, params }) => {
    const state = getState()
    const promises = []

    !MobilizationSelectors.hasCurrent(state) && promises.push(
      dispatch(MobilizationActions.select(params.mobilization_id))
    )
    !TemplateSelectors.isLoaded(state) && promises.push(
      dispatch(TemplateActions.asyncFetch())
    )
    return Promise.all(promises)
  }
}

const mapStateToProps = state => ({
  mobilization: MobilizationSelectors.getCurrent(state),
  templatesGlobalLength: TemplateSelectors.getGlobalTemplates(state).length,
  templatesCustomLength: TemplateSelectors.getCustomTemplates(state).length
})

export default provideHooks(redial)(connect(mapStateToProps)(TemplatesChoosePage))
