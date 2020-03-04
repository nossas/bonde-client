import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

export const TabItem = ({ component: Component, ...rest }) => {
  const StyledComponent = styled(Component)`
    display: inline-block;
    font-family: 'Nunito Sans', sans-serif;
    font-size: 13px;
    font-weight: 800;
    line-height: 1.15;
    color: ${props => props.inverted ? '#000' : '#fff'};
    text-transform: uppercase;
    cursor: pointer;
    margin: 0 15px 0 0;
    padding-bottom: 11px;
    text-decoration: none;

    ${props => props.active && css`
      border-bottom: 2px solid #ee0099;
      padding-bottom: 9px;
    `}

    &:hover, &:active {
      border-bottom: 2px solid #ee0099;
      padding-bottom: 9px;
    }
  `

  return <StyledComponent {...rest} />
}

const { any, bool } = PropTypes

TabItem.propTypes = {
  /** Invert the tab color style. */
  inverted: bool,
  /** Mark the current item as active style. */
  active: bool,
  /** Component used to render */
  component: any
}

TabItem.defaultProps = {
  inverted: false,
  active: false,
  component: 'a'
}

TabItem.displayName = 'TabItem'

/** @component */
export default TabItem
