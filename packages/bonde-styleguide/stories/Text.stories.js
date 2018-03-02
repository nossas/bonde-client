// import React from 'react'
// import { storiesOf } from '@storybook/react'
// import {
//   withKnobs,
//   text,
//   boolean,
//   number,
//   select,
//   color
// } from '@storybook/addon-knobs/react'
// import { Text, Title } from '../src'

// const fontWeightOpts = {
//   normal: 'Normal',
//   bold: 'Bold'
// }

// const alignOpts = {
//   left: 'left',
//   center: 'center',
//   right: 'right'
// }

// storiesOf('Text', module)
//   .addDecorator(withKnobs)
//   .addWithJSX('Text', () => (
//     <Text
//       fontSize={number('Font size', 18)}
//       fontWeight={select('Font weight', fontWeightOpts, 'normal')}
//       lineHeight={number('Line height', 1.39)}
//       align={select('Align', alignOpts, 'left')}
//       color={color('Color', '#000')}
//       uppercase={boolean('Uppercase?', false)}
//       margin={{
//         top: number('Margin top', 0),
//         bottom: number('Margin bottom', 0),
//         left: number('Margin left', 0),
//         right: number('Margin right', 0)
//       }}
//     >
//       {text('Children', 'Lorem ipsum dolor sit vaelum.')}
//     </Text>
//   ))
//   .addWithJSX('H1', () => (
//     <Title.H1
//       color={color('color', '#000')}
//       align={select('align', alignOpts, 'left')}
//     >
//       {text('Children', 'Header 1')}
//     </Title.H1>
//   ))
//   .addWithJSX('H2', () => (
//     <Title.H2
//       color={color('color', '#000')}
//       align={select('align', alignOpts, 'left')}
//     >
//       {text('Children', 'Header 2')}
//     </Title.H2>
//   ))
//   .addWithJSX('H3', () => (
//     <Title.H3
//       color={color('color', '#000')}
//       align={select('align', alignOpts, 'left')}
//     >
//       {text('Children', 'Header 3')}
//     </Title.H3>
//   ))
