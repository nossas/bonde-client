import React from 'react'
import { MetricsMobilization } from 'components/metrics'
import { Title } from 'components/title'

const MobilizationsSettingsMetricsPage = props => (
  <React.Fragment>
    <Title>Métricas</Title>
    <MetricsMobilization mobilizationId={props.mobilization.id} />
  </React.Fragment>
)

export default MobilizationsSettingsMetricsPage
