import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs, text, number } from '@storybook/addon-knobs/react'
import { Card } from '../src'
import { Row, Cell } from '../src/Grid'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'


const data = [
  {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
  {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
  {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
  {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
  {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
  {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
  {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
]

const withGrid = story => (
  <Row>
    <Cell size={[6]}>
      {story()}
    </Cell>
  </Row>
)

storiesOf('Chart', module)
  .addDecorator(withGrid)
  .addWithJSX('Simple Area Chart', () => (
    <Card title='Progresso'>
      <ResponsiveContainer minHeight={207}>
	<AreaChart
	  data={data}
	  margin={{top: 10, right: 30, left: 0, bottom: 0}}
	>
	  <XAxis dataKey="name" />
	  <YAxis />
	  <CartesianGrid strokeDasharray="3 3" />
	  <Tooltip />
	  <Area type='monotone' dataKey='uv' stroke='#8884d8' fill='#8884d8' />
	</AreaChart>
      </ResponsiveContainer>
    </Card>
  ))
