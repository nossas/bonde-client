import React, { PropTypes } from 'react'

// Global module dependencies
import * as Paths from '../../../../../scripts/Paths'
import { TellAFriend } from '../../../../../scripts/components'

const DonationTellAFriend = ({ mobilization }) => {
  return (
    <TellAFriend
      mobilization={mobilization}
      message={'Oba, doação registrada! Sua doação é via boleto? Verifique seu email.'}
      href={Paths.mobilization(mobilization)}
    />
  )
}

DonationTellAFriend.propTypes = {
  mobilization: PropTypes.object.isRequired
}

export default DonationTellAFriend
