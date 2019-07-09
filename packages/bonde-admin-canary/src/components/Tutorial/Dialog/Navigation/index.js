import React from 'react'
import { I18n } from 'react-i18next'
import Navigation from './Navigation'

const NavigationWrapper = props => (
  <I18n ns='home'>
    {t => (
      <Navigation t={t} {...props} />
    )}
  </I18n>
)

export default NavigationWrapper
