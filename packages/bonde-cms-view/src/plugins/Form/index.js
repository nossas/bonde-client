import React from 'react'
import PropTypes from 'prop-types'
import FormManager from './FormManager'

const FormWidget = ({ widget, config }) => {
  const { validations, onSubmit } = config
  const { buttonText, callToAction, fields, mainColor } = widget.settings

  return (
    <FormManager
      bgColor={mainColor}
      fields={fields}
      validations={validations}
      headerTitle={callToAction}
      submitLabel={buttonText}
      // Pass ownProps to submit
      onSubmit={(values) => onSubmit(values, { widget })}
    />
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
