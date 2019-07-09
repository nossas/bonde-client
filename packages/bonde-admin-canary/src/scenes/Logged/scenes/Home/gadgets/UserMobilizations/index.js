import React from 'react'
import { I18n } from 'react-i18next'
import MobilizationsGadget from './MobilizationsGadget'

const UserMobilizations = (props) => (
  <I18n ns='home'>
    {(t) => <MobilizationsGadget {...props} t={t} />}
  </I18n>
)

export default UserMobilizations
