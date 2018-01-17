//
// @route /mobilizations/:mobilization_id/widgets/:widget_id/form/export
//
import { connect } from 'react-redux'
import { asyncWidgetDataExport, dataExportMount } from '~client/mobrender/redux/action-creators'
import MobSelectors from '~client/mobrender/redux/selectors'

import Page from './page'

const mapStateToProps = state => {
  const selectors = MobSelectors(state)

  return {
    loading: state.mobilizations.dataExport.loading,
    error: state.mobilizations.dataExport.error,
    success: state.mobilizations.dataExport.success,
    mobilization: selectors.getMobilization(),
    widget: selectors.getWidget()
  }
}

const mapActionsToProps = {
  asyncWidgetDataExport,
  dataExportMount
}

export default connect(mapStateToProps, mapActionsToProps)(Page)
