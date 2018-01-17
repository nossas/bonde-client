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
  TextField
} from '~client/storybook/settings/forms'

storiesOf('TextField', module)
  .addDecorator(story => (
    <SettingsPageLayout>
      <SettingsPageMenuLayout title='Configure seu widget' />
      <SettingsPageContentLayout>
        <SettingsForm
          onSubmit={e => {
            e.preventDefault()
            action('onSubmit')()
          }}
          getPropI18n={action('getPropI18n')}
        >
          {story()}
        </SettingsForm>
      </SettingsPageContentLayout>
    </SettingsPageLayout>
  ))
  .add('default', () => (
    <TextField type='text' />
  ))
  .add('label', () => (
    <TextField label='Name' type='text' />
  ))
  .add('invalid', () => (
    <TextField
      i18n={(m) => m}
      label='E-mail'
      type='text'
      value='suporte@@'
      error='Invalid email'
      touched
    />
  ))
