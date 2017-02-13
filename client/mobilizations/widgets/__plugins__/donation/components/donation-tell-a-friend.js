import React, { PropTypes } from 'react'

// Global module dependencies
import * as paths from '~client/paths'
import { TellAFriend } from '~components/share'

const DonationTellAFriend = ({ mobilization }) => {
  return (
    <TellAFriend
      mobilization={mobilization}
      message={'Oba, doação registrada! Sua doação é via boleto? Verifique seu email.'}
      href={paths.mobilization(mobilization)}
    />
  )
}

DonationTellAFriend.propTypes = {
  mobilization: PropTypes.object.isRequired
}

export default DonationTellAFriend
