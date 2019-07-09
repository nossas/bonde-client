import React from 'react'
import { reduxForm } from 'redux-form'
import { InputHint, Flexbox2 as Flexbox } from 'bonde-styleguide'
import propTypes from 'prop-types'

const Form = ({ children, error, handleSubmit }) => {
  return (
    <form style={{ width: '100%' }} onSubmit={handleSubmit}>
      <Flexbox horizontal end>
        {error && <InputHint invalid>{error}</InputHint>}
      </Flexbox>
      {children}
    </form>
  )
}

Form.propTypes = {
  children: propTypes.node,
  error: propTypes.any,
  handleSubmit: propTypes.func
}

export default reduxForm({ form: 'components/Form' })(Form)
