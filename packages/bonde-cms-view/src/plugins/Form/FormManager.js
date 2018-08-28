import React from 'react'
import { Button, Field, Title, Form } from './ui'

export default class extends React.Component {

  state = {
    errors: {}
  }

  handleBlur(field, value) {
    let { errors } = this.state
    const validate = this.props.validations[field.kind]
    const error = validate && validate(field, value)
    
    if (error) {
      errors[field.uid] = error
    } else {
      delete errors[field.uid]
    }
    
    this.setState({ errors })
  }

  validateSubmit(fields, values) {
    const { validations } = this.props
    let errors = undefined
    fields.forEach(field => {
      const fieldValue = values.find(t => t.name === field.uid)
      const validate = validations[field.kind]
      const error = validate && validate(field, fieldValue ? fieldValue.value : undefined)
      if (!errors) errors = { [field.uid]: error }   
      else errors = { ...errors, [field.uid]: error }
    })
    return JSON.parse(JSON.stringify(errors))
  }

  render() {
    const { onSubmit, bgColor, submitLabel, headerTitle, fields } = this.props

    return (
      <Form
        bgColor={bgColor}
        onSubmit={(evt) => {
          evt.preventDefault()

          const values = fields.map(field => {
            return {
              name: field.uid,
              value: evt.target.elements[field.uid].value
            }
          })
          const errors = this.validateSubmit(fields, values)
          
          if (Object.keys(errors).length > 0) {
            this.setState({ errors })
          } else {
            return onSubmit(values)
          }
        }}
      >
        {headerTitle && (<Title>{headerTitle}</Title>)}
        {fields.map((field) => (
          <Field
            key={field.uid}
            field={field}
            onBlur={this.handleBlur.bind(this)}
            error={this.state.errors[field.uid]}
          />
        ))}
        {submitLabel && (<Button>{submitLabel}</Button>)}
      </Form>
    )
  }
}
