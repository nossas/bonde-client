import React from 'react'
import Text from './Text'
import Select from './Select'
import FieldError from './FieldError'

const Field = (props) => {
  if (props.kind === 'text' || props.kind === 'email') {
    return <Text {...props} />
  }
  if (props.kind === 'dropdown') {
    const opts = props.placeholder ? props.placeholder.split(',') : []
    return <Select {...props} opts={opts} />
  }
  
  throw new FieldError(`Field kind ${props.kind} not found.`)
}

export default Field
