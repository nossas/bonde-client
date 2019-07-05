import React from 'react'
import { I18n } from 'react-i18next'
import { Auth } from 'services/auth'
import CreateUserTagsForm from './CreateUserTagsForm'

const CreateUserTagsFormWrapper = () => (
  <I18n ns='tags'>
    {(t) => (
      <Auth>
        {({ user }) => (
          <CreateUserTagsForm
            t={t}
            user={user}
          />
        )}
      </Auth>
    )}
  </I18n>
)

export default CreateUserTagsFormWrapper
