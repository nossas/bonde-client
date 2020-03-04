import React from 'react'
import PropTypes from 'prop-types'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import {
  Card
} from '../../..'

const AreaChartCard = ({ sectionTitle, minHeight, data }) => (
  <Card title={sectionTitle} minHeight={minHeight}>
    <ResponsiveContainer minHeight={minHeight}>
      <AreaChart data={data}>
        <XAxis hide dataKey="name" />
        <YAxis hide />
        <Tooltip />
        <Area
          type='monotone'
          dataKey='uv'
          dot={false}
          stroke='#ff0093'
          fill='#ffa0de'
        />
      </AreaChart>
    </ResponsiveContainer>
  </Card>
)

AreaChartCard.defaultProps = {
  minHeight: 207
}

AreaChartCard.propTypes = {
  sectionTitle: PropTypes.string,
  minHeight: PropTypes.number,
  data: PropTypes.array.isRequired
}

AreaChartCard.displayName = 'AreaChartCard'

/** @component */
export default AreaChartCard
