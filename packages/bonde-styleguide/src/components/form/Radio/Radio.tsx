import React from 'react'
import styled from 'styled-components'
import Text from '../../content/Text/Text'

const Radio = styled(({ children, className, ...inputProps }) => (
  <label className={className}>
    <input type='radio' {...inputProps} />
    <Text>{children}</Text>
    <div className='box' />
  </label>
))`
  margin-right: 1.5rem;

  & .box {
    position: absolute;
    top: 3px;
    left: 0;
    height: 15px;
    width: 15px;
    background: #fff;
    border-color: #fff;
    box-shadow: 0 0 0 1px #4a4a4a;
    border: 1px solid #fff;
    border-radius: 50%;
  }


  &:hover input:not([disabled]) ~ .box,
  & input:not([disabled]):focus ~ .box {
    border-color: #fff;
    box-shadow: 0 0 0 1px #ee0099;
  }

  &:hover input:not([disabled]):checked ~ .box,
  & input:checked:focus ~ .box {
    border-color: #fff;
    box-shadow: 0 0 0 1px #ff0099;
  }

  & input:checked:focus ~ .box,
  & input:checked ~ .box {
    background: #ff0099;
    border-color: #fff;
    box-shadow: 0 0 0 1px #ff0099;
  }

  & input:disabled:checked ~ .box,
  & input:disabled ~ .box {
    border-color: #fff;
    box-shadow: 0 0 0 1px #d1cdd2;
  }

  & input:disabled:checked ~ .box {
    background: #d1cdd2;
  }

  & input:checked ~ .box:after {
    display: none;
  }

  & input:disabled ~ ${Text} {
    color: #d1cdd2;
  }
`

Radio.displayName = 'Radio'

/** @component */
export default Radio
