import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

/**
 * The only true Button component.
 */
const Button = styled.button`
  font-family: 'Nunito Sans', sans-serif;
  font-weight: 800;
  font-size: 13px;
  text-align: ${props => props.align};
  line-height: 1.15;
  height: 38px;
  border-radius: 100px;
  padding: ${props => props.padding};
  ${props => props.minWidth && `min-width: ${props.minWidth};`}
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
  outline: none;

  border: none;
  box-shadow: 1px 2px 7px 5px rgba(0, 0, 0, 0.08);
  background-color: #ee0099;
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

    path, g {
      fill: #fff;
    }

    &:hover {
      border-color: #bebebe;
      color: #bebebe;

      path, g {
        fill: #ee0099!important;
      }
    }
    &:active {
      border-color: #ee0099;
      color: #ee0099;
    }
  `}

  ${props => props.active && css`
    color: #ee0099!important;
    path, g {
      fill: #ee0099!important;
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
    text-align: center;
    min-width: auto;
    padding: 0 10px;

    &:hover {
      background-color: transparent;
      color: #424242;

      path, g {
        fill: #424242;
      }
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

  ${props => props.margin && props.margin.top && `margin-top: ${props.margin.top};`}
  ${props => props.margin && props.margin.bottom && `margin-bottom: ${props.margin.bottom};`}
  ${props => props.margin && props.margin.left && `margin-left: ${props.margin.left};`}
  ${props => props.margin && props.margin.right && `margin-right: ${props.margin.right};`}
`

const { oneOf, node, bool, string, shape } = PropTypes

Button.propTypes = {
  /** Children nodes. */
  children: node,
  /** Disable button. */
  disabled: bool,
  /** Active button. */
  active: bool,
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
  /** Button min-width. */
  minWidth: string,
  /** Button align. */
  align: oneOf(['center', 'left', 'right']),
  /** Button margin. */
  margin: shape({
    top: string,
    bottom: string,
    left: string,
    right: string,
  }),
  /** Button padding. */
  padding: string
}

Button.defaultProps = {
  align: 'center',
  type: 'button',
  margin: {},
  padding: '5px 20px'
}

Button.displayName = 'Button'

/** @component */
export default Button
