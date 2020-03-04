import PropTypes from 'prop-types'
import styled from 'styled-components'

/**
 * The only true Backdrop component.
 */
 const Backdrop = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  cursor: default;
  z-index: ${props => props.zIndex};
  background-color: ${props => props.color};
`

const { string, number } = PropTypes

Backdrop.defaultProps = {
  color: 'inherit',
  zIndex: 10,
}

Backdrop.propTypes = {
  /** The background color. */
  color: string,
  /** The z-index of backdrop. */
  zIndex: number
}

Backdrop.displayName = 'Backdrop'

/** @component */
export default Backdrop
