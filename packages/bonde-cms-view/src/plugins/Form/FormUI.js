import React from 'react'
import PropTypes from 'prop-types'
import { Button, Field, Title, Form } from './components'

class FormUI extends React.Component {

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
            this.setState({ errors: formErrors, submitting: false })
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

FormUI.propTypes = {
  /** Color to fill form */
  bgColor: PropTypes.string,
  /** Fields objects to render Field component */
  fields: PropTypes.array, 
  /** Main title of form */
  headerTitle: PropTypes.string,
  /** Label submit button if empty not render button */
  submitLabel: PropTypes.string,
  /** Validations to fields, array item should be { [kind]: function } */
  validations: PropTypes.object,
  /** Component render on submit successfull form */
  successfullyComponent: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node
  ]),
  /** Component render on submitting form */
  loadingComponent: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node
  ]),
  /** Receive values { [fieldName]: value }
   * and return Promise to submit form values */
  onSubmit: PropTypes.func
}

FormUI.defaultProps = {
  fields: [],
  validations: []
}

export default FormUI
