import React from 'react'
import { I18n } from 'react-i18next'
import { Auth } from 'services/auth'
import Tags from './Tags'

const TagsWrapper = (props) => (
  <I18n ns='tags'>
    {(t) => (
      <Auth>
        {({ user }) => <Tags t={t} user={user} {...props} />}
      </Auth>
    )}
  </I18n>
)

export default TagsWrapper
