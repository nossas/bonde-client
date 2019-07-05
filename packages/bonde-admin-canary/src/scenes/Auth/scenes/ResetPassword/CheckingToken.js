import React from 'react'
import { Loading } from 'components/Loadable'
import PropTypes from 'prop-types'

const CheckingToken = ({ t }) => (
  <Loading
    message={t('resetPassword.checkingToken')}
  />
)

CheckingToken.propTypes = {
  t: PropTypes.func
}

export default CheckingToken
