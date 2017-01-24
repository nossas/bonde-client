import React, { PropTypes } from 'react'

// Global module dependencies
import * as paths from '~client/paths'
import { TellAFriend } from '~components/share'

const FormTellAFriend = ({ mobilization }) => (
  <TellAFriend
    mobilization={mobilization}
    message='Formulário submetido com sucesso!'
    href={paths.mobilization(mobilization)}
  />
)

FormTellAFriend.propTypes = {
  mobilization: PropTypes.object.isRequired
}

export default FormTellAFriend
