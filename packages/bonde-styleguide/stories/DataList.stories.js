import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs, text } from '@storybook/addon-knobs/react'
import { Text } from '../src'
import DataList, { DataListRow, DataListCol } from '../src/DataList'
import { Row, Cell } from '../src/Grid'
import { jsxOptions } from './utils'

const moreAction = () => {
  action('clicked moreAction()')()
}
moreAction.displayName = 'moreAction()'

const withGrid = story => (
  <Row>
    <Cell size={[6]}>
      {story()}
    </Cell>
  </Row>
)

storiesOf('DataList', module)
  .addDecorator(withKnobs)
  .addDecorator(withGrid)
  .addWithJSX('default', () => (
    <DataList
      title={text('Title', 'Atividades recentes')}
      moreText={text('Text', 'Ver todos')}
      moreAction={moreAction}
    >
      <DataListRow>
        <DataListCol>
          <Text fontSize={14}>Susan Schwartz</Text>
        </DataListCol>
        <DataListCol>
          <Text fontSize={14}>george.lindgren@hotmail.com</Text>
        </DataListCol>
        <DataListCol align='left'>
          <Text fontSize={14}>{`23/10 às 14h`}</Text>
        </DataListCol>
      </DataListRow>
      <DataListRow>
        <DataListCol>
          <Text fontSize={14}>Mattie Cunningham</Text>
        </DataListCol>
        <DataListCol>
          <Text fontSize={14}>graciela_rath@lakin.ca</Text>
        </DataListCol>
        <DataListCol align='left'>
          <Text fontSize={14}>{`23/10 às 14h`}</Text>
        </DataListCol>
      </DataListRow>
    </DataList>
  ), jsxOptions)
