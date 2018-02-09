import React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'

import Wrapper from './Wrapper'
import { Preformatted, Hightlight } from './Icon.stories'
import { Title } from '../src'
import { Row, Cell } from '../src/Grid'

const Block = styled.div`
  background: purple;
  border-radius: 3px;
  box-shadow: inset 0 0 0 5px rgba(0,0,0,.5);
  padding: 15px 0;
  display: flex;
  font-size: .7rem;
  font-family: Nunito Sans;
  font-weight: 300;
  justify-content: center;
  align-items: center;
  color: #FFFFFF;
`

storiesOf('Grid', module)
  .add('Default', () => (
    <div>
      <Title.H1>Grid</Title.H1>
      <p>
        <Row>
          <Cell>
            <Block>[1, 2, 3, 4, 6, 12]</Block>
          </Cell>

          <Cell size={[8, 2, 3, 4, 6, 6]}>
            <Block>[8, 2, 3, 4, 6, 6]</Block>
          </Cell>

          <Cell size={[null, null, null, null, null, 6]}>
            <Block>[1, 2, 3, 4, 6, 6]</Block>
          </Cell>

          <Cell size={[2]}>
            <Block>[2, 2, 3, 4, 6, 12]</Block>
          </Cell>
        </Row>
      </p>

      <Preformatted>
        <Hightlight code={
`import { Row, Cell } from 'bonde-styleguide/Grid'

const Block = styled.div\`
  height: 50px;
  background: purple;
  border-radius: 3px;
  box-shadow: inset 0 0 0 5px rgba(0,0,0,.5);

  font-size: 50px;
  font-weight: bold;
  justify-content: center;
  color: #BBBBBB;
\`

<Row>
  <Cell>
    <Block>[1, 2, 3, 4, 6, 12]</Block>
  </Cell>

  <Cell size={[8, 2, 3, 4, 6, 6]}>
    <Block>[8, 2, 3, 4, 6, 6]</Block>
  </Cell>

  <Cell size={[null, null, null, null, null, 6]}>
    <Block>[1, 2, 3, 4, 6, 6]</Block>
  </Cell>

  <Cell size={[2]}>
    <Block>[2, 2, 3, 4, 6, 12]</Block>
  </Cell>
</Row>`
        } />
      </Preformatted>

      <Title.H1>Nested structure</Title.H1>

      <p>
        The red border is the root row and, the green border is the nested row.
      </p>

      <Row style={{ border: '2px solid red' }}>
        <Cell>
          <Block>1</Block>
        </Cell>
        <Cell size={[8]}>
          <Row style={{ border: '2px dashed green' }}>
            <Cell size={[6]}>
              <Block>8: 6</Block>
            </Cell>
            <Cell size={[3]}>
              <Block>8: 3</Block>
            </Cell>
            <Cell size={[3]}>
              <Block>8: 3</Block>
            </Cell>
          </Row>
        </Cell>
        <Cell size={[3]}>
          <Block>3</Block>
        </Cell>
      </Row>

      <Preformatted>
        <Hightlight code={
`<Row style={{ border: '2px solid red' }}>
  <Cell>
    <Block>1</Block>
  </Cell>
  <Cell size={[8]}>
    <Row style={{ border: '2px dashed green' }}>
      <Cell size={[6]}>
        <Block>8: 6</Block>
      </Cell>
      <Cell size={[3]}>
        <Block>8: 3</Block>
      </Cell>
      <Cell size={[3]}>
        <Block>8: 3</Block>
      </Cell>
    </Row>
  </Cell>
  <Cell size={[3]}>
    <Block>3</Block>
  </Cell>
</Row>`
        } />
      </Preformatted>


      <Title.H2>Cell</Title.H2>

      <Row>
        <Cell size={[8, 2, 3, 4, 6, 6]}>
          <Block>[8, 2, 3, 4, 6, 6]</Block>
        </Cell>
      </Row>

      <Preformatted>
        <Hightlight code={
`<Row>
  <Cell size={[8, 2, 3, 4, 6, 6]}>
    <Block>[8, 2, 3, 4, 6, 6]</Block>
  </Cell>
</Row>`
        } />
      </Preformatted>

      <Title.H3>Default values</Title.H3>

      <Preformatted>
        <Hightlight code={
`Cell.propTypes = {
  size: PropTypes.array
}

Cell.defaultProps = {
  size: [1, 2, 3, 4, 6, 12]
}`
        } />
      </Preformatted>

      <Title.H3>Definition</Title.H3>

      <p>
        From top to bottom, the values of array of size property are:
      </p>

      <Preformatted>
        <Hightlight code={
`<Cell
  size={[
    1, // @media (min-width: 1281px)
    2, // @media (min-width: 1025px)
    3, // @media (min-width: 801px)
    4, // @media (min-width: 600px)
    6, // @media (min-width: 480px)
    12 // @media (min-width: 320px)
  ]}
/>`
        } />
      </Preformatted>

      <p>
        You can keep the default values, changing only the media query you desire. For example,
        I want to change only the cell size when window width is between 480px and 600px:
        <b> (Resize the window to see.)</b>
      </p>

      <Row>
        <Cell size={[null, null, null, 8]}>
          <Block>[null, null, null, 8]</Block>
        </Cell>
      </Row>

      <Preformatted>
        <Hightlight code={
`<Row>
  <Cell size={[null, null, null, 8]}>
    <Block>[null, null, null, 8]</Block>
  </Cell>
</Row>`
        } />
      </Preformatted>
    </div>
  ))
