import { graphql } from 'react-apollo'
import { MetricsDataTable } from '../components'
import MetricsMobilizationGraphQL from './metrics-mobilization.graphql'

export default graphql(MetricsMobilizationGraphQL)(MetricsDataTable)
