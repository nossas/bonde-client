import React from 'react'
import PropTypes from 'prop-types'
import { Flexbox2 as Flexbox, InputHint } from 'bonde-styleguide'
import resetForm from './resetForm'

/**
  * GenericForm
  *
  * Render a form and a form error component
  */
class GenericForm extends React.Component {
  componentWillUnmount () {
    const { formId, cleanForm } = this.props
    if (cleanForm) resetForm(formId)
  }
  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps (nextProps) {
    if (!this.props.submitting && nextProps.submitSucceeded && this.props.cleanForm) {
      resetForm(this.props.formId)
    }
  }

  render () {
    const { children, error, handleSubmit, fluid } = this.props
    const formStyles = fluid ? {} : { width: '100%', height: '100%' }

    return (
      <form style={formStyles} onSubmit={handleSubmit}>
        <Flexbox horizontal end>
          {error && <InputHint invalid>{error}</InputHint>}
        </Flexbox>
        {children}
      </form>
    )
  }
}

const { bool, node, any, func, string } = PropTypes

GenericForm.propTypes = {
  formId: string,
  children: node,
  error: any,
  handleSubmit: func,
  fluid: bool.isRequired,
  cleanForm: bool.isRequired,
  submitting: bool.isRequired,
  submitSucceeded: bool.isRequired
}

GenericForm.defaultProps = {
  cleanForm: false,
  fluid: false
}

export default GenericForm
