import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { px, borderSpacing, borderSpacingPropTypes } from './utils'

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

Container.displayName = 'Container'

Container.propTypes = {
  padding: borderSpacingPropTypes,
  center: PropTypes.boolean
}

Container.defaultProps = {
  horizontal: false,
  center: false,
  padding: {},
  bottom: false
}

export default Container
