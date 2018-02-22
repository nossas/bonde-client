import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Wrapper from './Wrapper'
import Tabs, { Tab } from '../src/Tabs'

storiesOf('Tabs', module)
  .addDecorator(story =>(
    <Wrapper bg='#000'>
      {story()}
    </Wrapper>
  ))
  .add('default', () => (
    <Tabs>
      <Tab onClick={action('clicked Dashboard')}>Dashboard</Tab>
      <Tab onClick={action('clicked Mobilizações')}>Mobilizações</Tab>
    </Tabs>
  ))
  .add('with Tab active', () => (
    <Tabs>
      <Tab active onClick={action('clicked Dashboard')}>Dashboard</Tab>
      <Tab onClick={action('clicked Mobilizações')}>Mobilizações</Tab>
    </Tabs>
  ))
