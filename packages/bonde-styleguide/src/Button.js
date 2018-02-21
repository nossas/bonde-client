import React from 'react'
import styled, { css } from 'styled-components'

const Button = styled.button`{
  font-family: 'Nunito Sans', sans-serif;
  font-weight: 600;
  font-size: 13px;
  text-align: center;
  line-height: 1.15;
  height: 45px;
  border-radius: 100px;
  padding: 17px 19px;
  min-width: 192px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
  outline: none;

  /* custom styles  */
  border: none;
  box-shadow: 1px 2px 7px 5px rgba(0, 0, 0, 0.08);
  background-color: #ff0099;
  color: #fff;
  &:hover {
    background-color: #e2058a;
  }
  &:active {
    background-color: #b4006c;
  }

  ${props => (props.light || props.dark) && css`
    background: none;
    box-shadow: none;
    border: solid 1px;
    &:active {
      background: none;
      border-color: #ee0099;
      color: #ee0099;
    }
    &:hover {
      background: none;
    }
  `}

  ${props => props.light && css`
    color: #000;
    border-color: #000;
    &:hover {
      border-color: #545252;
      color: #545252;
    }
  `}

  ${props => props.dark && css`
    color: #fff;
    border-color: #fff;
    &:hover {
      border-color: #bebebe;
      color: #bebebe;
    }
    &:active {
      border-color: #ee0099;
      color: #ee0099;
    }
  `}

  ${props => props.disabled && `
    cursor: default;
    background-color: #d1cdd2;
    box-shadow: none;
    &:hover { background-color: #d1cdd2 }
    &:active { background-color: #d1cdd2 }
  `}
}`

Button.displayName = 'Button'

export default Button
