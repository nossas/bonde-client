import React from 'react'
import styled from 'styled-components'
import Input from '../Input/Input'

const SelectWrapper = styled.div`
  display: inline;
  position: relative;

  &:before {
    content: '';
    border-width: 4px;
    border-style: solid;
    border-color: transparent;
    border-top-color: #000000;
    position: absolute;
    right: 4px;
    top: 50%;
    margin-top: -2px;
  }
`

const SelectInput = Input.withComponent('select').extend`
  box-shadow: none;
  background: transparent;
  background-image: none;
  -webkit-border-radius: 0px;
  -webkit-appearance: none;
  position: relative;
  padding-right: 20px !important;

  &:hover {
    border-bottom: 1px solid #ee0099;
  }
`

const Select = props => (
  <SelectWrapper>
    <SelectInput {...props} />
  </SelectWrapper>
)

/* @component */
export default Select
