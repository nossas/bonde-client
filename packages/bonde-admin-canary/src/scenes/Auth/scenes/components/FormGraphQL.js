import React from 'react'
import { Mutation } from 'react-apollo'
import Form, { SubmissionError } from '../../../../components/Form'

const FormGraphQL = ({
  children,
  mutation, 
  onSubmit
}) => ( 
  <Mutation mutation={mutation}>
    {(mutationFunc) => (
      <Form
        onSubmit={(values) => {
          return onSubmit(values, mutationFunc)
            .catch((error) => {
              if (error && error.formError) {
                throw new SubmissionError({ _error: error.formError })
              }
              console.error(error)
            })
        }}
      >
        {children}
      </Form>
    )}
  </Mutation>
)

export default FormGraphQL
