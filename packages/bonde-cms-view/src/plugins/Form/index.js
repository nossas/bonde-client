import React from 'react'
import PropTypes from 'prop-types'
import { Button, Field, Form, Title } from './ui'

const FormWidget = ({ widget, config }) => {
 
  const onBlur = (field, value) => new Promise((resolve, reject) => {
      const validate = config.validations[field.kind]
      const error = validate && validate(field, value)
      if (error) return reject({ error })
      return resolve()
  })

  return (
    <Form bgColor={widget.settings.mainColor}>
      <Title>{widget.settings.callToAction}</Title>
      {widget.settings.fields.map((field) => (
        <Field
          key={field.uid}
          field={field}
          onBlur={onBlur}
        />
      ))}
      <Button>{widget.settings.buttonText}</Button>
    </Form>
  )
}

FormWidget.propTypes = {
  widget: PropTypes.shape({
    settings: PropTypes.shape({
      mainColor: PropTypes.string,
      callToAction: PropTypes.string.isRequired,
      buttonText: PropTypes.string.isRequired,
      fields: PropTypes.array
    }).isRequired
  })
}

FormWidget.defaultProps = {
  widget: {
    settings: {
      fields: []
    }
  },
  config: {
    validations: []
  }
}

export default FormWidget
