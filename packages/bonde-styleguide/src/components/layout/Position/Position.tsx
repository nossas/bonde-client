import styled from 'styled-components'
import PropTypes from 'prop-types'

const Position = styled.div`
  ${props => props.absolute && `
    position: absolute;
  `}
  ${props => props.relative && `
    position: absolute;
  `}

  ${props => !!props.top && `top: ${props.top}px;`}

  ${props => !!props.bottom && `bottom: ${props.bottom}px;`}

  ${props => !!props.left && `left: ${props.left}px;`}

  ${props => !!props.right && `right: ${props.right}px;`}

  ${props => props.index && `z-index: ${props.index};`}
  ${props => props.width && `width: ${props.width};`}
  ${props => props.height && `height: ${props.height};`}
`

const { bool, number, string } = PropTypes

Position.propTypes = {
  absolute: bool,
  relative: bool,
  top: number,
  bottom: number,
  left: number,
  right: number,
  index: number,
  width: string,
  height: string
}

/** @component */
export default Position