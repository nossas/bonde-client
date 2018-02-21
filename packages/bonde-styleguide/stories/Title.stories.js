import React from 'react'
import { storiesOf } from '@storybook/react'
import Wrapper from './Wrapper'
import { Title } from '../src'

storiesOf('Title', module)
  .addDecorator(story => (
    <Wrapper>
      {story()}
    </Wrapper>
  ))
  .addWithJSX('H1', () => <Title.H1>Título</Title.H1>)
  .addWithJSX('H2', () => <Title.H2>Título</Title.H2>)
  .addWithJSX('H3', () => <Title.H3>Título</Title.H3>)
