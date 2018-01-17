import { graphql } from 'react-apollo'
import { MetricsDataTable } from '../components'
import MetricsCommunityGraphQL from './metrics-community.graphql'

export default graphql(MetricsCommunityGraphQL)(MetricsDataTable)
