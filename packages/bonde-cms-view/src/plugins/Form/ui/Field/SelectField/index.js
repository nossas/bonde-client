import React from 'react'
import FormField from '../FormField'
import Select from './Select'

export default ({ uid, label, name, opts, onBlur, error }) => (
  <FormField label={label} error={error}>
    <Select id={`input-${uid}`} name={name} onBlur={onBlur}>
      <option value=''>{`---`}</option>
      {opts && opts.map((value, i) => (
        <option key={`dropdown-option-${i}`} value={value}>
          {value}
        </option>
      ))}
    </Select>
  </FormField>
)
