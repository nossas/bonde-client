import React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, number, select } from '@storybook/addon-knobs/react'

import Progress, { sizes } from '../src/Progress'

const sizeOptions = {
  xsmall: 'xsmall',
  small: 'small',
  normal: 'normal',
  large: 'large',
  xlarge: 'xlarge'
}

const createKnobsProgress = () => (
  <Progress.Bar
    size={select('size', sizeOptions, 'normal')}
    value={number('value', 10)}
    trackColor={text('trackColor', '#eeeeee')}
    thumbColor={text('thumbColor', '#50e3c2')}
    textColor={text('textColor', '#000000')}
  />
)

const options = {
  showDefaultProps: false,
  showFunctions: false
}

storiesOf('Progress', module)
  .addDecorator(withKnobs)
  .addWithJSX('Bar', () => createKnobsProgress(), options)
