import { provideHooks } from 'redial'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'

import MobSelectors from '~client/mobrender/redux/selectors'
import { toggleMobilizationMenu } from '~client/mobrender/redux/action-creators'
import * as TemplateActions from '~client/mobilizations/templates/action-creators'
import * as TemplateSelectors from '~client/mobilizations/templates/selectors'

import Page from './page'

const redial = {
  fetch: ({ dispatch, getState, params }) => {
    const state = getState()
    const promises = []

    !TemplateSelectors.isLoaded(state) && promises.push(
      dispatch(TemplateActions.asyncFetch())
    )
    promises.push(dispatch(toggleMobilizationMenu(undefined)))
    return Promise.all(promises)
  }
}

const mapStateToProps = state => ({
  loading: TemplateSelectors.isLoading(state),
  menuActiveIndex: MobSelectors(state).getMobilizationMenuActive(),
  mobilizationTemplates: TemplateSelectors.getCustomTemplates(state)
})

const mapActionCreatorsToProps = {
  asyncDestroyTemplate: TemplateActions.asyncDestroyTemplate,
  toggleMenu: toggleMobilizationMenu
}

export default provideHooks(redial)(
  connect(mapStateToProps, mapActionCreatorsToProps)(injectIntl(Page))
)
