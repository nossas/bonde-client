import { connect } from 'react-redux'
import { asyncWidgetDataExport, dataExportMount } from '~client/mobilizations/widgets/action-creators'

import Page from './page'

const mapStateToProps = (state, props) => {
  return {
    loading: state.mobilizations.dataExport.loading,
    error: state.mobilizations.dataExport.error,
    success: state.mobilizations.dataExport.success
  }
}

const mapActionsToProps = {
  asyncWidgetDataExport,
  dataExportMount
}

export default connect(mapStateToProps, mapActionsToProps)(Page)
