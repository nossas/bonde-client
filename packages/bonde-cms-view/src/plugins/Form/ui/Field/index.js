import React from 'react'
import TextField from './TextField'
import SelectField from './SelectField'

class Field extends React.Component {

  handleBlur (evt) {
    const { field, onBlur } = this.props
    onBlur(field, evt.target.value)
  }

  render() {
    const { field, error } = this.props

    const otherProps = {
      name: field.uid,
      onBlur: this.handleBlur.bind(this),
      error
    }

    if (field.kind === 'text' || field.kind === 'email') {
      return <TextField {...field} {...otherProps} />
    }
    if (field.kind === 'dropdown') {
      const opts = field.placeholder ? field.placeholder.split(',') : []
      return <SelectField {...field} {...otherProps} opts={opts} />
    }
    
    throw new Error(`Field kind ${field.kind} not found.`)
  }
}

export default Field
