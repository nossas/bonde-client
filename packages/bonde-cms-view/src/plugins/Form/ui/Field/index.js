import React from 'react'
import TextField from './TextField'
import SelectField from './SelectField'

class Field extends React.Component {

  state = {
    error: undefined
  }

  render() {
    const { field, onBlur } = this.props
    
    // TOOD: tests this snippet code
    const handleBlur = ({ target }) => {
      return onBlur(field, target.value)
        .then(() => this.setState({ error: undefined }))
        .catch(({ error }) => {
          this.setState({ error })
        })
    }

    const otherProps = {
      onBlur: handleBlur,
      error: this.state.error
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
