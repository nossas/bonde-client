import styled from 'styled-components'
import { borderSpacing, borderSpacingPropTypes } from '../../utils'

/**
 * The generic scroll box component.
 */
const Scrollbox = styled.div`{
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  ${props => borderSpacing('padding', props.padding)}

  &::-webkit-scrollbar {
    width: 33px;
  }
  &::-webkit-scrollbar-track {
    background-clip: padding-box;
    background-color: rgba(151,151,151,.25);
    border: 20px solid transparent;
    border-left-width: 16px;
    border-right-width: 16px;
  }
  &::-webkit-scrollbar-thumb {
    background-clip: padding-box;
    background-color: rgba(74,74,74,.75);
    border: 20px solid transparent;
    border-left-width: 15px;
    border-right-width: 15px;
  }
}`

Scrollbox.propTypes = {
  padding: borderSpacingPropTypes
}

Scrollbox.defaultProps = {
  padding: 0
}

/* @component */
export default Scrollbox
