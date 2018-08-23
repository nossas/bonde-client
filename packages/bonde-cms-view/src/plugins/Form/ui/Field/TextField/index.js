import React from 'react'
import FormField from '../FormField'
import Input from './Input'

export default ({ uid, label, kind, placeholder, onBlur, error }) => (
  <FormField label={label} error={error}>
    <Input
      id={`input-${uid}`}
      type={kind}
      placeholder={placeholder}
      onBlur={onBlur}
    />
  </FormField>
)
