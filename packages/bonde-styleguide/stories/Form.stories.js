import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Wrapper from './Wrapper'
import { ControlLabel, Input, Select, Checkbox, Radio } from '../src/Form'

storiesOf('Form/Input', module)
  .addDecorator(story => (
    <Wrapper>
      {story()}
    </Wrapper>
  ))
  .addWithJSX('default', () => <Input placeholder='Placeholder' />)
  .addWithJSX('invalid', () => (
    <Input value='username@g' onChange={action('onChange')} invalid />
  ))
  .addWithJSX('disabled', () => <Input value='username@bonde.org' disabled />)

storiesOf('Form/ControlLabel', module)
  .addDecorator(story => (
    <Wrapper>
      {story()}
    </Wrapper>
  ))
  .addWithJSX('default', () => <ControlLabel>Label</ControlLabel>)

storiesOf('Form/Select', module)
  .addDecorator(story => (
    <Wrapper>
      {story()}
    </Wrapper>
  ))
  .addWithJSX('default', () => (
    <Select>
      <option>Selecione</option>
    </Select>
  ))
  .addWithJSX('invalid', () => (
    <Select invalid>
      <option>Selecione</option>
    </Select>
  ))
  .addWithJSX('disabled', () => (
    <Select value='1' disabled>
      <option>Selecione</option>
      <option value='1'>Value 1</option>
    </Select>
  ))

storiesOf('Form/Checkbox', module)
  .addDecorator(story => (
    <Wrapper>
      {story()}
    </Wrapper>
  ))
  .addWithJSX('default', () => <Checkbox>Checkbox</Checkbox>)
  .addWithJSX('checked', () => <Checkbox checked readOnly>Checkbox</Checkbox>)
  .addWithJSX('disabled', () => <Checkbox disabled>Checkbox</Checkbox>)
  .addWithJSX('checked and disabled', () => <Checkbox checked disabled>Checkbox</Checkbox>)

storiesOf('Form/Radio', module)
  .addDecorator(story => (
    <Wrapper>
      {story()}
    </Wrapper>
  ))
  .addWithJSX('default', () => <Radio>Radio</Radio>)
  .addWithJSX('checked', () => <Radio checked readOnly>Radio</Radio>)
  .addWithJSX('disabled', () => <Radio disabled>Radio</Radio>)
  .addWithJSX('checked and disabled', () => <Radio checked disabled>Radio</Radio>)

