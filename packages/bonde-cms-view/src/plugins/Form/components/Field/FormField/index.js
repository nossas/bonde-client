import React from 'react'
import styled from 'styled-components'
import ControlLabel from './ControlLabel'
import FieldError from './FieldError'

const FormField = styled.div`
  margin-bottom: 1rem;
`

export default ({ children, label, error }) => (
  <FormField>
    {label && <ControlLabel>{label}</ControlLabel>}
    {children}
    {error && <FieldError>{error}</FieldError>}
  </FormField>
)
