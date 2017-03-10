import { connect } from 'react-redux'

import MobSelectors from '~client/mobrender/redux/selectors'
import * as MobActions from '~client/mobrender/redux/action-creators'

import Page from './page'

const mapStateToProps = (state, props) => {
  const selectors = MobSelectors(state, props)
  return {
    mobilizations: selectors.getMobilizations(),
    menuActiveIndex: selectors.getMobilizationMenuActive()
  }
}

const mapActionsToProps = {
  select: MobActions.selectMobilization,
  toggleMenu: MobActions.toggleMobilizationMenu
}

export default connect(mapStateToProps, mapActionsToProps)(Page)
