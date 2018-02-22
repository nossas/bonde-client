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
  .add('H1', () => <Title.H1>Título</Title.H1>)
  .add('H2', () => <Title.H2>Título</Title.H2>)
  .add('H3', () => <Title.H3>Título</Title.H3>)
