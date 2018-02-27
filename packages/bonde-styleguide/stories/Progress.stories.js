import React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import { withKnobs, number, select, color } from '@storybook/addon-knobs/react'

import Progress from '../src/Progress'

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
    trackColor={color('trackColor', '#eeeeee')}
    thumbColor={color('thumbColor', '#50e3c2')}
    textColor={color('textColor', '#000000')}
  />
)

const options = {
  showDefaultProps: false,
  showFunctions: false
}

storiesOf('Progress', module)
  .addDecorator(withKnobs)
  .addWithJSX('Bar', () => createKnobsProgress(), options)
