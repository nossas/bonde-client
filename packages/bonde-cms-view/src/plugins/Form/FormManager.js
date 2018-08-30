import React from 'react'
import { Button, Field, Title, Form } from './ui'

export default class extends React.Component {

  state = {
    errors: {},
    submitting: false,
    submitted: false
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
    const {
      onSubmit,
      bgColor,
      submitLabel,
      headerTitle,
      fields,
      successfullyComponent: Successfully,
      loadingComponent: Loading
    } = this.props
    const { errors, submitting, submitted } = this.state

    return submitted && Successfully ? <Successfully /> : (
      <Form
        bgColor={bgColor}
        onSubmit={(evt) => {
          evt.preventDefault()
          this.setState({ submitting: true })

          const values = fields.map(field => {
            return {
              name: field.uid,
              value: evt.target.elements[field.uid].value
            }
          })
          const formErrors = this.validateSubmit(fields, values)
          
          if (Object.keys(formErrors).length > 0) {
            this.setState({ errors: formErrors })
          } else {
            return onSubmit(values)
              .then(() => {
                this.setState({ submitting: false, submitted: true })
              })
          }
        }}
      >
        {submitting && Loading && <Loading />}
        {headerTitle && (<Title>{headerTitle}</Title>)}
        {fields.map((field) => (
          <Field
            key={field.uid}
            field={field}
            onBlur={this.handleBlur.bind(this)}
            error={errors[field.uid]}
          />
        ))}
        {submitLabel && (<Button disabled={submitting}>{submitLabel}</Button>)}
      </Form>
    )
  }
}
