//
// @route /mobilizations/:mobilization_id/widgets/:widget_id/donation/finish
//
import { connect } from 'react-redux'

import MobSelectors from '~client/mobrender/redux/selectors'
import * as MobActions from '~client/mobrender/redux/action-creators'

import Page from './page'

const mapStateToProps = (state, props) => {
  const selectors = MobSelectors(state, props)

  return {
    mobilization: selectors.getMobilization(),
    widget: selectors.getWidget()
  }
}

const mapDispatchToProps = {
  asyncWidgetUpdate: MobActions.asyncUpdateWidget
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)
