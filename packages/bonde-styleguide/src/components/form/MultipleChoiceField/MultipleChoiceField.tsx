import React from 'react'
import styled from 'styled-components'

const InputContainer = styled.div`
  text-align: center;
`

const MultipleChoiceField = ({
  inputComponent: InputComponent,
  input,
  options,
  separator
}) => {

  let values = input.value ? input.value.split(separator) : []

  const onChangeField = (evt) => {
    const value = evt.target.value
    if (values.includes(value)) {
      values = values.filter(val => val !== value)
    } else {
      values.push(value)
    }
    input.onChange(values.join(separator))
  }
  
  return (
    <InputContainer>
      {options.map((field) => (
        <InputComponent
          key={`inputKey-${field.value}`}
          {...field}
          checked={values.includes(field.value)}
          onChange={onChangeField}
        />
      ))}
    </InputContainer>
  )
}

MultipleChoiceField.defaultProps = {
  separator: ';'
}

MultipleChoiceField.displayName = 'MultipleChoiceField'

/** @component */
export default MultipleChoiceField
