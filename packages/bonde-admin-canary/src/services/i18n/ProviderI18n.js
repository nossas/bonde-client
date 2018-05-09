import React from 'react'
import { I18nextProvider } from 'react-i18next'
import i18n from './instance'

export default ({ children }) => (
  <I18nextProvider i18n={i18n}>
    {children}
  </I18nextProvider>
)
