import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, number } from '@storybook/addon-knobs/react'
import { Assets } from '../src'
import Card from '../src/Card'
import { Row, Cell } from '../src/Grid'
import ProgressRanking from '../src/ProgressRanking'

const withGrid = story => (
  <Row>
    <Cell size={[3]}>
      {story()}
    </Cell>
  </Row>
)

const numberOpts = {
  range: true,
  max: 3000,
  min: 1
}

storiesOf('Card Brazil Map', module)
  .addDecorator(withKnobs)
  .addDecorator(withGrid)
  .addWithJSX('default', () => (
    <Card
      title={text('Card title', 'Localização')}
      minHeight={number('Min. height', 250)}
      paddingX={number('Padding Y', 27)}
      inline
    >
      <ProgressRanking
        trackColor='#eeeeee'
        color='#ee0099'
        maxValue={3000}
        padding={{ right: 46 }}
      >
        <ProgressRanking.Item
          label='São Paulo'
          value={number('São Paulo', 2361, numberOpts)}
        />
        <ProgressRanking.Item
          label='Rio de Janeiro'
          value={number('Rio de Janeiro', 1522, numberOpts)}
        />
        <ProgressRanking.Item
          label='Curtiba'
          value={number('Curitiba', 654, numberOpts)}
        />
        <ProgressRanking.Item
          label='Recife'
          value={number('Recife', 322, numberOpts)}
        />
      </ProgressRanking>
      <Assets.BrazilMap width={300} />
    </Card>
  ))
