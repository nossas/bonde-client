import PropTypes from 'prop-types'
import styled from 'styled-components'
import { px } from '../../../utils'
/**
 * The generic scroll box component.
 */
const Scrollbox = styled.div`
  height: ${props => props.height ? px(props.height) : '100%'};
  overflow-y: auto;
  overflow-x: hidden;
  ${props => props.margin && props.margin.top && `top: ${props.margin.top};`}
  ${props => props.margin && props.margin.bottom && `bottom: ${props.margin.bottom};`}
  ${props => props.margin && props.margin.left && `left: ${props.margin.left};`}
  ${props => props.margin && props.margin.right && `right: ${props.margin.right};`}

  ${props => props.padding && props.padding.top && `top: ${props.padding.top};`}
  ${props => props.padding && props.padding.bottom && `bottom: ${props.padding.bottom};`}
  ${props => props.padding && props.padding.left && `left: ${props.padding.left};`}
  ${props => props.padding && props.padding.right && `right: ${props.padding.right};`}
  ${props => props.borderBottom && `
    border-bottom: 1px solid #c7c7c75c;
  `}

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
`

Scrollbox.propTypes = {
  margin: PropTypes.shape({
    top: PropTypes.string,
    bottom: PropTypes.string,
    left: PropTypes.string,
    right: PropTypes.string,
  }),
  padding: PropTypes.shape({
    top: PropTypes.string,
    bottom: PropTypes.string,
    left: PropTypes.string,
    right: PropTypes.string,
  })
}

Scrollbox.defaultProps = {
  padding: {}
}

Scrollbox.displayName = 'Scrollbox'

/** @component */
export default Scrollbox
