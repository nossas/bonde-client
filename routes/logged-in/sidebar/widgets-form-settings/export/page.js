import React, { PropTypes } from 'react'

import { Loading } from '~components/await'
import { DataExport } from '~mobilizations/widgets/components'

const FormSettingsExportPage = props => !props.widget ? <Loading /> : (
  <DataExport {...props} />
)

FormSettingsExportPage.propTypes = {
  params: PropTypes.object.isRequired,
  // Injected by react-redux
  asyncWidgetDataExport: PropTypes.func.isRequired,
  dataExportMount: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  success: PropTypes.bool,
  error: PropTypes.object,
  // Injected by container
  widget: PropTypes.object.isRequired,
  mobilization: PropTypes.object.isRequired
}

export default FormSettingsExportPage
