import React from 'react'
import { Loading } from 'components/Loadable'

export default ({ t }) => (
  <Loading
    message={t('resetPassword.checkingToken')}
  />
)
