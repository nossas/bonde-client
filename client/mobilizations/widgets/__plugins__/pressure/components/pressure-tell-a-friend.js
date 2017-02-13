import React, { PropTypes } from 'react'

// Global module dependencies
import { TellAFriend } from '~components/share'

const PressureTellAFriend = ({ mobilization }) => (
  <TellAFriend
    mobilization={mobilization}
    message='Pressão enviada'
    href={window.location.origin}
  />
)

PressureTellAFriend.propTypes = {
  mobilization: PropTypes.object.isRequired
}

export default PressureTellAFriend
