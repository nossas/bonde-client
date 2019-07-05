import React from 'react'
import { I18nextProvider } from 'react-i18next'
import i18n from './instance'
import PropTypes from 'prop-types'

const ProviderI18n = ({ children }) => (
  <I18nextProvider i18n={i18n}>
    {children}
  </I18nextProvider>
)

ProviderI18n.propTypes = {
  children: PropTypes.node
}

export default ProviderI18n
