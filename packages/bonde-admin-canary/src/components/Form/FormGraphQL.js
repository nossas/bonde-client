import React from 'react'
import { Mutation } from 'react-apollo'
import { Form, SubmissionError } from './'

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
                  errors = {...errors, ...error.fields}
                }
                throw new SubmissionError(errors)
              } 
              console.error(error)
            })
        }}
        {...props}
      >
        {children}
      </Form>
    )}
  </Mutation>
)

export default FormGraphQL
