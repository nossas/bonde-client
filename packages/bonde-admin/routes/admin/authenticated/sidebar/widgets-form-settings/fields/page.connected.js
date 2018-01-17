//
// @route /mobilizations/:mobilization_id/widgets/:widget_id/form/fields
//
import { connect } from 'react-redux'

import MobSelectors from '~client/mobrender/redux/selectors'
import * as MobActions from '~client/mobrender/redux/action-creators'

import Page from './page'

const mapStateToProps = state => {
  const selectors = MobSelectors(state)

  return {
    mobilization: selectors.getMobilization(),
    widget: selectors.getWidget()
  }
}

const mapActionsToProps = { asyncWidgetUpdate: MobActions.asyncUpdateWidget }

export default connect(mapStateToProps, mapActionsToProps)(Page)
