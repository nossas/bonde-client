import React from 'react'
import { MetricsMobilization } from '~client/components/metrics'
import { Title } from '~client/components/title'

const MobilizationsSettingsMetricsPage = props => (
  <React.Fragment>
    <Title>Métricas</Title>
    <MetricsMobilization mobilizationId={props.mobilization.id} />
  </React.Fragment>
)

export default MobilizationsSettingsMetricsPage
