import React from 'react'
import { storiesOf } from '@storybook/react'
import Wrapper from './Wrapper'
import Tabs, { Tab } from '../src/Tabs'

storiesOf('Tabs', module)
  .addDecorator(story =>(
    <Wrapper bg='#000'>
      {story()}
    </Wrapper>
  ))
  .addWithJSX('default', () => (
    <Tabs>
      <Tab>Dashboard</Tab>
      <Tab>Mobilizações</Tab>
    </Tabs>
  ))
  .addWithJSX('with Tab active', () => (
    <Tabs>
      <Tab active>Dashboard</Tab>
      <Tab>Mobilizações</Tab>
    </Tabs>
  ))
