//
// @route /mobilizations/templates/list
//
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'

import MobSelectors from '~client/mobrender/redux/selectors'
import { toggleMobilizationMenu } from '~client/mobrender/redux/action-creators'
import * as TemplateActions from '~client/mobilizations/templates/action-creators'
import * as TemplateSelectors from '~client/mobilizations/templates/selectors'

import Page from './page'

const mapStateToProps = state => ({
  loaded: TemplateSelectors.isLoaded(state),
  loading: TemplateSelectors.isLoading(state),
  menuActiveIndex: MobSelectors(state).getMobilizationMenuActive(),
  mobilizationTemplates: TemplateSelectors.getCustomTemplates(state)
})

const mapActionCreatorsToProps = {
  asyncDestroyTemplate: TemplateActions.asyncDestroyTemplate,
  toggleMenu: toggleMobilizationMenu,
  asyncFetch: TemplateActions.asyncFetch
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(injectIntl(Page))
