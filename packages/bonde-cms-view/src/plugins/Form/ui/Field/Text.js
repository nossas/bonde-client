import React from 'react'
import styled from 'styled-components'
import FormField from './FormField'

const Input = styled.input`
  display: block;
  border-radius: 2px;
  padding: 1rem;
  box-sizing: border-box;
  height: auto;
  border: 1px solid #eeeeee;
  margin-bottom: 1rem;
  width: 100%;
`

export default ({ uid, label, kind, placeholder }) => (
  <FormField label={label}>
    <Input
      id={`input-${uid}`}
      type={kind}
      placeholder={placeholder}
    />
  </FormField>
)
