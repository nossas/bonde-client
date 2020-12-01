import React from 'react';
import styled from 'styled-components';
import { FormField, Label, Hint, useField } from 'bonde-components';

type SelectProps = {
  disabled?: boolean
}

const Select = styled.select<SelectProps>`
  font-family: 'Nunito Sans',sans-serif;
  font-size: 16px;
  color: #000;
  border: none;
  border-bottom: 1px solid #aaa;
  padding: 8px 0;
  box-shadow: none;
  background: transparent;
  background-image: none;
  border-radius: 0px;
  appearance: none;
  position: relative;
  padding-right: 32px !important;

  &:hover {
    border-bottom: 1px solid #EE0099;
  }
  
  display: inline-block;
  position: relative;
  width: 100%;
  cursor: pointer;

  &:before {
    content: '';
    position: absolute;
    right: 16px;
    top: 13px;
    width: 5px;
    height: 5px;
    border: solid ${props => props.disabled ? '#AAAAAA' : '#4A4A4A'};
    border-width: 0 1.5px 1.5px 0;
    transform: rotate(45deg);
  }
  &:focus {
    outline: none;
  }
`;

type Props = {
  children: any
  label: string
  name: string
  disabled?: boolean
}

const SelectField = (props: Props) => {
  const { label, name, disabled, children, ...config } = props;
  const { input, meta } = useField(name, config);

  return (
    <FormField>
      <Label>{label}</Label>
      {(meta.error || meta.submitError) && meta.touched && (
        <Hint color="error">{meta.error || meta.submitError}</Hint>
      )}
      <Select disabled={disabled} {...input}>
        {children}
      </Select>
    </FormField>
  );
};

export default SelectField;
