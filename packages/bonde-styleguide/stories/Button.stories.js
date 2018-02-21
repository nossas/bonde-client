import React from 'react'
import { storiesOf } from '@storybook/react'
import Wrapper from './Wrapper'
import { Button } from '../src'

const skip = 1

storiesOf('Button', module)
  .addWithJSX('Default', () => (
    <Wrapper>
      <Button>Principal</Button>
    </Wrapper>
  ), { skip })
  .addWithJSX('Default disabled', () => (
    <Wrapper>
      <Button disabled>Desabilitado</Button>
    </Wrapper>
  ), { skip })
  .addWithJSX('Light', () => (
    <Wrapper>
      <Button light>Secundário</Button>
    </Wrapper>
  ), { skip })
  .addWithJSX('Dark', () => (
    <Wrapper bg='#000'>
      <Button dark>Secundário</Button>
    </Wrapper>
  ), { skip })
