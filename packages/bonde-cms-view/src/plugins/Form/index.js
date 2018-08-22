import React from 'react'
import PropTypes from 'prop-types'
import { Button, Field, Form, Title } from './ui'

const FormWidget = ({ widget }) => (
  <Form bgColor={widget.settings.mainColor}>
    <Title>{widget.settings.callToAction}</Title>
    {widget.settings.fields.map((field) => (
      <Field key={field.uid} {...field} />
    ))}
    <Button>{widget.settings.buttonText}</Button>
  </Form>
)

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
  }
}

export default FormWidget
