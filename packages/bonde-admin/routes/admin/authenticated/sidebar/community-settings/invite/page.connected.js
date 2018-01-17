//
// @route /community/invite
//
import React from 'react'
import { FormattedMessage } from 'react-intl'
import { createForm, Field } from '~client/storybook/forms'
import {
  combineValidations,
  required,
  isEmail
} from '~client/storybook/forms/validate'
import { SettingsForm, TextField } from '~client/storybook/settings/forms'
import { Info } from '~client/components/notify'
import { asyncInvite } from '~client/community/action-creators'
import * as CommunitySelectors from '~client/community/selectors'
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
