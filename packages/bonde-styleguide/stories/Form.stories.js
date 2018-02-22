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
  .add('default', () => <Input placeholder='Placeholder' />)
  .add('invalid', () => (
    <Input value='username@g' onChange={action('onChange')} invalid />
  ))
  .add('disabled', () => <Input value='username@bonde.org' disabled />)

storiesOf('Form/ControlLabel', module)
  .addDecorator(story => (
    <Wrapper>
      {story()}
    </Wrapper>
  ))
  .add('default', () => <ControlLabel>Label</ControlLabel>)

storiesOf('Form/Select', module)
  .addDecorator(story => (
    <Wrapper>
      {story()}
    </Wrapper>
  ))
  .add('default', () => (
    <Select>
      <option>Selecione</option>
    </Select>
  ))
  .add('invalid', () => (
    <Select invalid>
      <option>Selecione</option>
    </Select>
  ))
  .add('disabled', () => (
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
  .add('default', () => <Checkbox>Checkbox</Checkbox>)
  .add('checked', () => <Checkbox checked readOnly>Checkbox</Checkbox>)
  .add('disabled', () => <Checkbox disabled>Checkbox</Checkbox>)
  .add('checked and disabled', () => <Checkbox checked disabled>Checkbox</Checkbox>)

storiesOf('Form/Radio', module)
  .addDecorator(story => (
    <Wrapper>
      {story()}
    </Wrapper>
  ))
  .add('default', () => <Radio>Radio</Radio>)
  .add('checked', () => <Radio checked readOnly>Radio</Radio>)
  .add('disabled', () => <Radio disabled>Radio</Radio>)
  .add('checked and disabled', () => <Radio checked disabled>Radio</Radio>)

