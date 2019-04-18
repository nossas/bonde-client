import styled from 'styled-components'
import { px } from '../../utils'

const Card = styled.div`{
  position: relative;
  border-radius: ${props => px(props.rounded || '1px')};
  background-color: #ffffff;
  box-shadow: 2px 1px 14px 11px rgba(0, 0, 0, 0.04);
  width: ${props => props.width ? `${px(props.width)}` : '100%'};
  display: block;
  ${props => props.margin && `margin: ${props.margin};`}
  ${props => props.height && `height: ${props.height};`}
  ${props => props.onClick && `cursor: pointer;`}
  ${props => props.border && `border: ${props.border};`}

}`

Card.displayName = 'Card'

export default Card
