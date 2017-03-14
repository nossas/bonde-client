import { provideHooks } from 'redial'
import { connect } from 'react-redux'

import * as MobilizationActions from '~mobilizations/action-creators'
import * as MobilizationSelectors from '~mobilizations/selectors'
import * as TemplateActions from '~mobilizations/templates/action-creators'
import * as TemplateSelectors from '~mobilizations/templates/selectors'

import Page from './page'

const redial = {
  fetch: ({ dispatch, getState, params }) => {
    const state = getState()
    const promises = []

    !TemplateSelectors.isLoaded(state) && promises.push(
      dispatch(TemplateActions.asyncFetch())
    )
    promises.push(dispatch(MobilizationActions.toggleMenu(undefined)))
    return Promise.all(promises)
  }
}

const mapStateToProps = state => ({
  loading: TemplateSelectors.isLoading(state),
  menuActiveIndex: MobilizationSelectors.getMenuActiveIndex(state),
  mobilizationTemplates: TemplateSelectors.getCustomTemplates(state)
})

const mapActionCreatorsToProps = {
  asyncDestroyTemplate: TemplateActions.asyncDestroyTemplate,
  toggleMenu: MobilizationActions.toggleMenu
}

export default provideHooks(redial)(
  connect(mapStateToProps, mapActionCreatorsToProps)(Page)
)
