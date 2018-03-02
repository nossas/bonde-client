import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

export const TabItem = styled.a`{
  display: inline-block;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 13px;
  font-weight: 800;
  line-height: 1.15;
  color: ${props => props.inverted ? '#000' : '#fff'};
  text-transform: uppercase;
  cursor: pointer;
  margin: 0 15px 0 0;
  padding: 14px 0;
  ${props => props.active && css`
    border-bottom: 3px solid #ee0099;
    padding-bottom: 11px;
  `}

  &:hover, &:active {
    border-bottom: 3px solid #ee0099;
    padding-bottom: 11px;
  }
}`

const { bool } = PropTypes

TabItem.propTypes = {
  /** Invert the tab color style. */
  inverted: bool,
  /** Mark the current item as active style. */
  active: bool
}

TabItem.defaultProps = {
  inverted: false,
  active: false
}

/* @component */
export default TabItem
