import PropTypes from 'prop-types'
import React from 'react'

// Global module dependencies
import * as paths from '~client/paths'
import { TellAFriend } from '~client/components/share'

const DonationTellAFriend = ({ preview, mobilization, widget }) => {
  return (
    <TellAFriend
      preview={preview}
      mobilization={mobilization}
      widget={widget}
      message={'Oba, doação registrada! Sua doação é via boleto? Verifique seu email.'}
      href={paths.mobilization(mobilization)}
    />
  )
}

DonationTellAFriend.propTypes = {
  preview: PropTypes.bool,
  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired
}

export default DonationTellAFriend
