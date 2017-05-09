import PropTypes from 'prop-types'
import React from 'react'

import { TellAFriend } from '~client/components/share'

const PressureTellAFriend = ({ preview, mobilization, widget }) => (
  <TellAFriend
    preview={preview}
    mobilization={mobilization}
    widget={widget}
    message='Pressão enviada'
  />
)

PressureTellAFriend.propTypes = {
  preview: PropTypes.bool,
  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired
}

export default PressureTellAFriend
