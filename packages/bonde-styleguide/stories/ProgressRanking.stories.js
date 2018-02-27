import React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import { withKnobs, color, boolean, number, select } from '@storybook/addon-knobs/react'

import ProgressRanking from '../src/ProgressRanking'

const sizeOptions = {
  xsmall: 'xsmall',
  small: 'small',
  normal: 'normal',
  large: 'large',
  xlarge: 'xlarge'
}

const createKnobsProgressRanking = () => (
  <ProgressRanking
    color={color('color', '#50e3c2')}
    trackColor={color('trackColor', '#eeeeee')}
    trackSize={select('trackSize', sizeOptions, 'xsmall')}
    maxValue={number('maxValue', 2450)}
    nosort={boolean('nosort', false)}
  >
    <ProgressRanking.Item value={610} label='Sem FiuFiu' />
    <ProgressRanking.Item value={1602} label='Somos toda Olga' />
    <ProgressRanking.Item value={2450} label='Existe Amor em SP' />
    <ProgressRanking.Item value={901} label='Empodera!' />
    <ProgressRanking.Item value={967} label='Respeita as Mina' />
  </ProgressRanking>
)

const options = {
  showDefaultProps: false,
  showFunctions: false
}

storiesOf('ProgressRanking', module)
  .addDecorator(withKnobs)
  .addWithJSX('default', () => createKnobsProgressRanking(), options)
