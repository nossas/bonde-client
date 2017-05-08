import PropTypes from 'prop-types'
import React from 'react'

import { Loading } from '~client/components/await'
import { DataExport } from '~client/mobilizations/widgets/components'

const DonationSettingsExportPage = props => !props.widget ? <Loading /> : <DataExport {...props} />

DonationSettingsExportPage.propTypes = {
  params: PropTypes.object.isRequired,
  // Injected by container
  widget: PropTypes.object.isRequired,
  mobilization: PropTypes.object.isRequired,
  // Injected by react-redux
  loading: PropTypes.bool.isRequired,
  success: PropTypes.bool,
  error: PropTypes.object,
  asyncWidgetDataExport: PropTypes.func.isRequired,
  dataExportMount: PropTypes.func.isRequired
}

export default DonationSettingsExportPage
