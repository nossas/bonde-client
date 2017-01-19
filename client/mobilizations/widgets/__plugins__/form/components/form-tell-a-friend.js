import React, { PropTypes } from 'react'

// Global module dependencies
import * as Paths from '../../../../../scripts/Paths'
import { TellAFriend } from '../../../../../scripts/components'

const FormTellAFriend = ({ mobilization }) => (
  <TellAFriend
    mobilization={mobilization}
    message='Formulário submetido com sucesso!'
    href={Paths.mobilization(mobilization)}
  />
)

FormTellAFriend.propTypes = {
  mobilization: PropTypes.object.isRequired
}

export default FormTellAFriend
