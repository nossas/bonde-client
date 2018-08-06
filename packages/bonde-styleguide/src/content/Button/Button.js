import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { borderSpacing, borderSpacingPropTypes } from '../../utils'

/**
 * The only true Button component.
 */
const Button = styled.button`{
  font-family: 'Nunito Sans', sans-serif;
  font-weight: 800;
  font-size: 13px;
  text-align: ${props => props.align};
  line-height: 1.15;
  height: 38px;
  border-radius: 100px;
  padding: ${props => props.padding || '0 25px'};
  min-width: 192px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
  outline: none;

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

  ${props => props.flat && `
    background-color: transparent;
    border-color: transparent;
    color: #000000;
    box-shadow: none;
    min-width: 88px;

    &:hover {
      background-color: transparent;
      color: #424242;
    }
    &:active {
      background-color: transparent;
      color: #9b9b9b;
    }
  `}

  ${props => props.flat && props.dark && `
    color: #fff;

    &:hover {
      border-color: transparent;
      color: #bebebe;
    }
    &:active {
      border-color: transparent;
      color: #ee0099;
    }
  `}

  ${props => props.flat && props.disabled && `
    color: #aaaaaa;
    &:hover { color: #aaaaaa }
    &:active { color: #aaaaaa }
  `}

  ${props => props.color && `
    color: ${props.color};
  `}

  ${props => props.margin && borderSpacing('margin', props.margin)}
}`

const { oneOf, node, bool, string } = PropTypes

Button.propTypes = {
  /** Children nodes. */
  children: node,
  /** Disable button. */
  disabled: bool,
  /** Dark button style. */
  dark: bool,
  /** Light button style. */
  light: bool,
  /** Flat button style. */
  flat: bool,
  /** Button text color. */
  color: string,
  /** Button type. */
  type: string,
  align: oneOf(['center', 'left', 'right']),
  margin: borderSpacingPropTypes
}

Button.defaultProps = {
  align: 'center',
  type: 'button',
  margin: {}
}

Button.displayName = 'Button'

/* @component */
export default Button
