// import React from 'react'
// import styled from 'styled-components'
// import { storiesOf } from '@storybook/react'
// import { withKnobs, array } from '@storybook/addon-knobs/react'

// import { Title } from '../src'
// import { Row, Cell } from '../src/Grid'

// const Block = styled.div`
//   background: purple;
//   border-radius: 3px;
//   box-shadow: inset 0 0 0 5px rgba(0,0,0,.5);
//   padding: 15px 0;
//   display: flex;
//   font-size: .7rem;
//   font-family: Nunito Sans;
//   font-weight: 300;
//   justify-content: center;
//   align-items: center;
//   color: #FFFFFF;
// `

// const createKnobsGrid = props => {
//   const defaultSizes = [1, 2, 3, 4, 6, 12]
//   const secondCell = array('2nd cell', [8, 2, 3, 4, 6, 6])
//   const thirdCell = array('3rd cell', [null, null, null, null, null, 6])
//   const fourthCell = array('4th cell', [2])

//   const fill = value => [...value, ...defaultSizes.slice(value.length)]

//   return (
//     <Row>
//       <Cell>
//         <Block>[{`${defaultSizes}`}]</Block>
//       </Cell>

//       <Cell size={secondCell}>
//         <Block>{`[${fill(secondCell)}]`}</Block>
//       </Cell>

//       <Cell size={thirdCell}>
//         <Block>{`[${fill(thirdCell)}]`}</Block>
//       </Cell>

//       <Cell size={fourthCell}>
//         <Block>{`[${fill(fourthCell)}]`}</Block>
//       </Cell>
//     </Row>
//   )
// }

// const options = {
//   showDefaultProps: false,
//   showFunctions: false
// }

// Block.displayName = 'Block'

// storiesOf('Grid', module)
//   .addDecorator(withKnobs)
//   .addWithJSX('default', () => createKnobsGrid(), options)
//   .addWithJSX('nested structure', () => (
//     <Row style={{ border: '2px solid red' }}>
//       <Cell>
//         <Block>1</Block>
//       </Cell>
//       <Cell size={[8]}>
//         <Row style={{ border: '2px dashed green' }}>
//           <Cell size={[6]}>
//             <Block>8: 6</Block>
//           </Cell>
//           <Cell size={[3]}>
//             <Block>8: 3</Block>
//           </Cell>
//           <Cell size={[3]}>
//             <Block>8: 3</Block>
//           </Cell>
//         </Row>
//       </Cell>
//       <Cell size={[3]}>
//         <Block>3</Block>
//       </Cell>
//     </Row>
//   ))
//   .addWithJSX('cell', () => (
//     <Row>
//       <Cell size={[8, 2, 3, 4, 6, 6]}>
//         <Block>[8, 2, 3, 4, 6, 6]</Block>
//       </Cell>
//     </Row>
//   ))
//   .add('NOTE', () => (
//     <div>
//       <Title.H3>Default values</Title.H3>

//       <Preformatted>
//         <Hightlight code={
// `Cell.propTypes = {
//   size: PropTypes.array
// }

// Cell.defaultProps = {
//   size: [1, 2, 3, 4, 6, 12]
// }`
//         } />
//       </Preformatted>

//       <Title.H3>Definition</Title.H3>

//       <p>
//         From top to bottom, the values of array of size property are:
//       </p>

//       <Preformatted>
//         <Hightlight code={
// `<Cell
//   size={[
//     1, // @media (min-width: 1281px)
//     2, // @media (min-width: 1025px)
//     3, // @media (min-width: 801px)
//     4, // @media (min-width: 600px)
//     6, // @media (min-width: 480px)
//     12 // @media (min-width: 320px)
//   ]}
// />`
//         } />
//       </Preformatted>

//       <p>
//         You can keep the default values, changing only the media query you desire. For example,
//         I want to change only the cell size when window width is between 480px and 600px:
//         <b> (Resize the window to see.)</b>
//       </p>

//       <Row>
//         <Cell size={[null, null, null, 8]}>
//           <Block>[null, null, null, 8]</Block>
//         </Cell>
//       </Row>

//       <Preformatted>
//         <Hightlight code={
// `<Row>
//   <Cell size={[null, null, null, 8]}>
//     <Block>[null, null, null, 8]</Block>
//   </Cell>
// </Row>`
//         } />
//       </Preformatted>
//     </div>
//   ))
