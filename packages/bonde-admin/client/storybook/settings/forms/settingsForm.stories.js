import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import {
  SettingsPageLayout,
  SettingsPageMenuLayout,
  SettingsPageContentLayout
} from '~client/storybook/settings/layout'
import {
  SettingsForm,
  TextField,
  RadioField,
  Radio
} from '~client/storybook/settings/forms'

const Form = (props) => (
  <SettingsForm
    onSubmit={e => {
      e.preventDefault()
      action('onSubmit')()
    }}
    getPropI18n={action('getPropI18n')}
    {...props}
  >
    <TextField label='Input text' type='text' />
    <TextField label='Input number' type='number' />
    <RadioField label='Radio button' value='yes'>
      <Radio value='yes'>Yes</Radio>
      <Radio value='no'>No</Radio>
    </RadioField>
  </SettingsForm>
)

storiesOf('Formulário de configuração', module)
  .addDecorator(story => (
    <SettingsPageLayout>
      <SettingsPageMenuLayout title='Configure seu widget' />
      <SettingsPageContentLayout>
        {story()}
      </SettingsPageContentLayout>
    </SettingsPageLayout>
  ))
  .add('default', () => (
    <Form />
  ))
  .add('when submitting', () => (
    <Form submitting />
  ))
  .add('when submit of success', () => (
    <Form
      submitted
      getPropI18n={(k) => (k === 'successMessage' && 'Formulário salvo com sucesso!')}
      successMessage='Formulário salvo com sucesso!'
    />
  ))
