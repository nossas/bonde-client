//
// @route /community/invite
//
import React from 'react'
import { FormattedMessage } from 'react-intl'
import { createForm, Field } from 'storybook/forms'
import {
  combineValidations,
  required,
  isEmail
} from 'storybook/forms/validate'
import { SettingsForm, TextField } from 'storybook/settings/forms'
import { Info } from 'components/notify'
import { asyncInvite } from 'community/action-creators'
import * as CommunitySelectors from 'community/selectors'
import { i18nKeys } from './i18n'

const InviteForm = createForm({
  name: 'communityInviteForm',
  fields: ['communityId', 'email'],
  initialValues: (state) => ({
    communityId: CommunitySelectors.getCurrentId(state)
  }),
  validate: combineValidations([
    required('email'),
    isEmail('email')
  ]),
  submit: asyncInvite,
  component: SettingsForm
})

export default () => (
  <InviteForm i18nKeys={i18nKeys}>
    <Info
      title={(
        <FormattedMessage
          id='page--community-invite.info.title'
          defaultMessage='Informação'
        />
      )}
    >
      <FormattedMessage
        id='page--community-invite.info.content'
        defaultMessage={
          'Convide novos usuários para fazerem parte da sua comunidade, eles terão ' +
          'acesso as mesmas informações que o você possui.{br}' +
          'Utilizando o formulário abaixo, você envia o convite por e-mail.'
        }
        values={{
          br: <br />
        }}
      />
    </Info>
    <Field type='text' name='email' component={TextField} />
  </InviteForm>
)
