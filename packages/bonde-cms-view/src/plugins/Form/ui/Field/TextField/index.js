import React from 'react'
import FormField from '../FormField'
import Input from './Input'

export default ({ uid, label, name, kind, placeholder, onBlur, error }) => (
  <FormField label={label} error={error}>
    <Input
      id={`input-${uid}`}
      name={name}
      type={kind}
      placeholder={placeholder}
      onBlur={onBlur}
    />
  </FormField>
)
