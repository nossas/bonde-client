import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Wrapper from './Wrapper'
import { Button } from '../src'

storiesOf('Button', module)
  .add('Default', () => (
    <Wrapper>
      <Button onClick={action('onClick')}>Principal</Button>
    </Wrapper>
  ))
  .add('Default disabled', () => (
    <Wrapper>
      <Button disabled>Desabilitado</Button>
    </Wrapper>
  ))
  .add('Light', () => (
    <Wrapper>
      <Button onClick={action('onClick')} light>Secundário</Button>
    </Wrapper>
  ))
  .add('Dark', () => (
    <Wrapper bg='#000'>
      <Button onClick={action('onClick')} dark>Secundário</Button>
    </Wrapper>
  ))
