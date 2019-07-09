import React from 'react'
import { Mutation } from 'react-apollo'
import { Form, SubmissionError } from './'
import PropTypes from 'prop-types'

const FormGraphQL = ({
  children,
  mutation,
  update,
  refetchQueries,
  onSubmit,
  ...props
}) => (
  <Mutation mutation={mutation} update={update} refetchQueries={refetchQueries}>
    {(mutationFunc) => (
      <Form
        onSubmit={(values) => {
          return onSubmit(values, mutationFunc)
            .catch((error) => {
              if (error && (error.form || error.fields)) {
                let errors = {}
                if (error.form) {
                  errors = { _error: error.form }
                }
                if (error.fields) {
                  errors = { ...errors, ...error.fields }
                }
                throw new SubmissionError(errors)
              }
            })
        }}
        {...props}
      >
        {children}
      </Form>
    )}
  </Mutation>
)

FormGraphQL.propTypes = {
  children: PropTypes.node,
  mutation: PropTypes.object,
  update: PropTypes.func,
  refetchQueries: PropTypes.arrayOf(PropTypes.object),
  onSubmit: PropTypes.func
}

export default FormGraphQL
