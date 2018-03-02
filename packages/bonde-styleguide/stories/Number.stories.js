// import React from 'react'
// import { storiesOf } from '@storybook/react'
// import { withKnobs, number, select } from '@storybook/addon-knobs/react'
// import { Card, IconColorful, Number } from '../src'
// import { Row, Cell } from '../src/Grid'
// import { jsxOptions } from './utils'

// const withGrid = story => (
//   <Row>
//     <Cell size={[2]}>
//       {story()}
//     </Cell>
//   </Row>
// )

// const icons = {
//   greeting: IconColorful.Greeting,
//   power: IconColorful.Power,
//   dollarSign: IconColorful.DollarSign
// }

// const options = {
//   empty: 'Select icon',
//   greeting: 'Greeting',
//   power: 'Power',
//   dollarSign: 'Dollar Sign'
// }

// storiesOf('Number', module)
//   .addDecorator(withKnobs)
//   .addDecorator(withGrid)
//   .addWithJSX('default', () => (
//     <Card minHeight={number('Min. height', 110)} bottom>
//       <Number
//         value={number('Value', 34)}
//         icon={icons[select('Icon', options, 'empty')]}
//       />
//     </Card>
//   ), jsxOptions)
