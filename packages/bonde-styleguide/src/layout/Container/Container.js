import PropTypes from 'prop-types'
import styled from 'styled-components'
import { borderSpacing, borderSpacingPropTypes } from '../../utils'

/**
 * The only true container.
 */
const Container = styled.div`{
  display: flex;
  ${props => borderSpacing('padding', props.padding)}
  ${props => props.center && `align-items: center;`}
  ${props => props.horizontal ? `justify-content: space-between;` : `
    flex-direction: column;
  `}
  ${props => props.bottom && `align-items: flex-end;`}
  ${props => props.right && `align-items: flex-end;`}
}`

const { bool } = PropTypes

Container.propTypes = {
  padding: borderSpacingPropTypes,
  center: bool,
  horizontal: bool,
  bottom: bool
}

Container.defaultProps = {
  padding: {},
  center: false,
  horizontal: false,
  bottom: false
}

/* @component */
export default Container
