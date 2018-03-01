import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Text from '../Text'
import { px } from '../utils'

const CardBox = styled.div`{
  border-radius: 1px;
  box-shadow: 2px 1px 14px 11px rgba(0, 0, 0, .04);
  
  background-color: ${props => props.bgColor || '#fff'};
  min-height: ${props => px(props.minHeight)};
  max-height: ${props => px(props.maxHeight)}; 

  display: flex;
  flex-direction: column;
  ${props => props.middle && `justify-content: center;`}
  ${props => props.bottom && `justify-content: flex-end;`} 
}`

const CardTitle = ({ children }) => (
  <Text
    uppercase
    fontSize={13}
    lineHeight={1.15}
    color='#4a4a4a'
    fontWeight='bold'
    margin={{ y: 16 }}
  >
    {children}
  </Text>
)
 
/**
 *  The only true card.
 */
const Card = styled(({
  children,
  className,
  title,
  ...boxProps
}) => (
  <div className={className}>
    {title && (<CardTitle>{title}</CardTitle>)}
    <CardBox {...boxProps}>
      {children}
    </CardBox>
  </div>
))`{
  display: flex;
  flex-direction: column;
}`

Card.displayName = 'Card'
Card.propTypes = {
  minHeight: PropTypes.number,
  maxHeight: PropTypes.number, 
}

export default Card
