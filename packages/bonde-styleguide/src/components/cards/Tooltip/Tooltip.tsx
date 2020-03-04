import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Icon from '../../content/Icon/Icon'
import Button from '../../content/Button/Button'
import Backdrop from '../../layout/Backdrop/Backdrop'
import { px } from '../../../utils'

const CloseButton = styled(({ className, onClose }) => (
  <div className={className}>
    <Button flat onClick={onClose}>
      <Icon name='times' size={12} color='#FFFFFF' />
    </Button>
  </div>
))`
  position: absolute;
  top: 12px;
  right: 12px;

  & > ${Button} {
    padding: 0;
    min-width: 38px;
  }
`

const CardTooltip = styled(({ className, onClose, Content }) => (
  <div className={className}>
    {onClose && <CloseButton onClose={onClose} />}
    <Content />
  </div>
))`
  color: #FFFFFF;
  border-radius: 1px;
  background-color: #424242;
  box-shadow: 2px 1px 14px 11px rgba(0, 0, 0, 0.04);
  padding: 30px;
  position: absolute;
  z-index: 10;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${props => props.margin && props.margin.top && `margin-top: ${px(props.margin.top)};`}
  ${props => props.margin && props.margin.bottom && `margin-bottom: ${px(props.margin.bottom)};`}
  ${props => props.margin && props.margin.left && `margin-left: ${px(props.margin.left)};`}
  ${props => props.margin && props.margin.right && `margin-right: ${px(props.margin.right)};`}

  ${props => props.minWidth && `
    min-width: ${props.minWidth}px;
  `}
  ${props => props.width && `
    width: ${props.width}px;
  `}
  ${props => props.minHeight && `
    min-height: ${props.minHeight}px;
  `}
  ${props => props.small && `
    padding: 15px;
  `}

  &:before {
    content: '';
    position: absolute;
    border: 8px solid transparent;

    ${props => props.placement.startsWith('left') && `
      right: -16px;
      border-left-color: #424242;
    `}
    ${props => props.placement.startsWith('right') && `
      left: -16px;
      border-right-color: #424242;
    `}
    ${props => props.placement.startsWith('top') && `
      bottom: -16px;
      border-top-color: #424242;
    `}
    ${props => props.placement.startsWith('bottom') && `
      top: -16px;
      border-bottom-color: #424242;
    `}
    ${props => props.placement.endsWith('top') && `
      top: 8%;
    `}
    ${props => props.placement.endsWith('bottom') && `
      bottom: 8%;
    `}
    ${props => props.placement.endsWith('left') && `
      left: 8%;
    `}
    ${props => props.placement.endsWith('right') && `
      right: 8%;
    `}

    /**
     * TODO: Needs to fix middle positions.
     */
    ${props => ['top-middle', 'bottom-middle'].includes(props.placement) && `
      left: calc(50% - 8px);
    `}
    ${props => ['right-middle', 'left-middle'].includes(props.placement) && `
      top: calc(50% - 8px);
    `}
  }

  ${props => props.placement.startsWith('top') && `
    margin-bottom: 8px;
    bottom: 103%;
  `}
  ${props => props.placement.startsWith('bottom') && `
    margin-top: 8px;
    top: 103%;
  `}
  ${props => props.placement.startsWith('left') && `
    margin-right: 8px;
    right: 103%;
  `}
  ${props => props.placement.startsWith('right') && `
    margin-left: 8px;
    left: 103%;
  `}
  ${props => props.placement.endsWith('top') && `
    top: 0;
  `}
  ${props => props.placement.endsWith('bottom') && `
    bottom: 0;
  `}
  ${props => props.placement.endsWith('left') && `
    left: 0;
  `}
  ${props => props.placement.endsWith('right') && `
    right: 0;
  `}

  /**
   * TODO: Needs to fix middle positions.
   */
  ${props => ['top-middle', 'bottom-middle'].includes(props.placement) && `
    left: calc(50% - 41px);
  `}
  ${props => ['right-middle', 'left-middle'].includes(props.placement) && `
    top: calc(50% - 41px);
  `}

  ${props => props.position && props.position.top && `top: ${props.position.top};`}
  ${props => props.position && props.position.bottom && `bottom: ${props.position.bottom};`}
  ${props => props.position && props.position.left && `left: ${props.position.left};`}
  ${props => props.position && props.position.right && `right: ${props.position.right};`}
`

const Tooltip = styled(({ className, children, nolock, backdropClose, show, ...props }) => (
  <div className={className}>
    {show && !nolock && <Backdrop onClick={backdropClose ? props.onClose : undefined} />}
    {show && <CardTooltip {...props} />}
    {children}
  </div>
))`
  display: inline-block;
  position: relative;
  width: 100%;
`

const { oneOfType, oneOf, node, func, bool, shape, number, string } = PropTypes

Tooltip.propTypes = {
  /** The component that will be wrapped with the tooltip. */
  children: oneOfType([node, func]).isRequired,
  /** The minimum width of tooltip. */
  minWidth: number,
  /** The minimum height of tooltip. */
  minHeight: number,
  /** The content that will we rendered inside of the tooltip. */
  Content: oneOfType([node, func]).isRequired,
  /** If pass this prop, the backdrop will not be rendered. */
  nolock: bool,
  /** Enable this to show the tooltip. */
  show: bool,
  /** The function that will be executed to close the tooltip. */
  onClose: func,
  /** Enable this to execute the `onClose` function when Backdrop was clicked. */
  backdropClose: bool,
  /** The position that the tooltip will be placed around the target. */
  placement: oneOf([
    'top-left',
    'top-middle',
    'top-right',
    'right-top',
    'right-middle',
    'right-bottom',
    'bottom-left',
    'bottom-middle',
    'bottom-right',
    'left-top',
    'left-middle',
    'left-bottom',
  ]),
  /** Manually set the position of tooltip relative to the target. */
  position: shape({
    top: string,
    bottom: string,
    left: string,
    right: string,
  }),
  margin: shape({
    top: oneOfType([string, number]),
    bottom: oneOfType([string, number]),
    left: oneOfType([string, number]),
    right: oneOfType([string, number]),
  })
}

Tooltip.defaultProps = {
  nolock: false,
  backdropClose: false,
  show: true,
  placement: 'right-top',
  position: {},
  margin: {}
}

Tooltip.displayName = 'Tooltip'

/** @component */
export default Tooltip
