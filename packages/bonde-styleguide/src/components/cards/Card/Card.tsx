import React from 'react'
// import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Spacing } from '../../layout'
import { px } from '../../../utils'

const CardStyled = styled.div`
  position: relative;
  border-radius: ${props => px(props.rounded || '1px')};
  background-color: #ffffff;
  box-shadow: 2px 1px 14px 11px rgba(0, 0, 0, 0.04);
  width: ${props => props.width ? `${px(props.width)}` : '100%'};
  display: block;
  ${props => props.height && `height: ${props.height};`}
  ${props => props.onClick && `cursor: pointer;`}
  ${props => props.border && `border: ${props.border};`}
`
interface Props {
  margin?: {
    x?: number;
    y?: number;
    top?: number | string;
    bottom?: number | string;
    left?: number | string;
    right?: number | string;
  },

  padding?: {
    x?: number;
    y?: number;
    top?: number | string;
    bottom?: number | string;
    left?: number | string;
    right?: number | string;
  },
  children?: any;
  title?: string;
  minHeight?: string;
  middle?: boolean;
  onClick?: any;
}
const Card = (
  { margin = { x: 0, y:0 }, padding = { x: 0, y:0 }, children, ...rest }: Props
  ) => margin || padding ? (
  <Spacing margin={margin}>
    <CardStyled {...rest}>
      <Spacing padding={padding}>
        {children}
      </Spacing>
    </CardStyled>
  </Spacing>
) : (
  <CardStyled {...rest}>
    {children}
  </CardStyled>
)

// Card.displayName = 'Card'

// Card.propTypes = {
//   margin: PropTypes.object,
//   padding: PropTypes.object
// }

/** @component */
export default Card
