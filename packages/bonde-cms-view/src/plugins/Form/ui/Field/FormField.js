import React from 'react'
import styled from 'styled-components'

const ControlLabel = styled.label`
  display: block;
  font-size: .75rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: white;
  letter-spacing: 0;
  text-transform: uppercase;
`

const FormField = styled.div`
  margin-bottom: 1rem;
`

export default ({ children, label }) => (
  <FormField>
    {label && <ControlLabel>{label}</ControlLabel>}
    {children}
  </FormField>
)
