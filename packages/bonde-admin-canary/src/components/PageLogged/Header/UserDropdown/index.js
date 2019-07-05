import React from 'react'
import { I18n } from 'react-i18next'
import { Auth } from 'services/auth'
import UserDropdown from './UserDropdown'

const UserDropDownWrapper = (props) => (
  <I18n ns='header'>
    {(t) => (
      <Auth>
        {({ user, logout }) => (
          <UserDropdown
            t={t}
            user={user}
            logout={logout}
            {...props}
          />
        )}
      </Auth>
    )}
  </I18n>
)

export default UserDropDownWrapper
