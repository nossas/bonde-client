import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Wrapper from './Wrapper'
import Loading from '../src/Loading/Loading'

storiesOf('Loading', module)
  .addDecorator(story => (
    <Wrapper>
      {story()}
    </Wrapper>
  ))
  .addWithJSX('Default', () => (
    <Loading />
  ))
  .addWithJSX('resize', () => (
    <Loading size='50' />
  ))
  .addWithJSX('icon color', () => (
    <Loading color='#DD2295' />
  ))
  .addWithJSX('sparkles animation color', () => (
    <Loading sparklesColor='#985368' />
  ))
  .addWithJSX('sparkles initial color', () => (
    <Loading sparklesColorInit='#000000' />
  ))
  .addWithJSX('sparkles change colors', () => (
    <Loading sparklesColorInit='#FFFFFF' sparklesColor='#FFD500' />
  ))
  .addWithJSX('sparkles duration', () => (
    <Loading sparklesDuration='1s' />
  ))
