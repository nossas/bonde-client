import React from 'react'
import styled from 'styled-components'
import FormField from './FormField'

const Select = styled.select`
  border-radius: 2px;
  padding: 1rem;
  display: block;
  box-sizing: border-box;
  background-color: white;
  appearance: none;
  border: 1px solid #ccc;
  width: 100%;
  margin-bottom: 1rem;
` 

export default ({ uid, label, opts }) => (
  <FormField label={label}>
    <Select id={`input-${uid}`}>
      <option value=''>{`---`}</option>
      {opts && opts.map((value, i) => (
        <option key={`dropdown-option-${i}`} value={value}>
          {value}
        </option>
      ))}
    </Select>
  </FormField>
)
