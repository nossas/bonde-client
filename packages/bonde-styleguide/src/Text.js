import React from 'react'
import styled from 'styled-components'

const Text = styled.p`{
  font-family: 'Nunito Sans', sans-serif;
  font-size: 18px; 
  font-weight: normal;
  line-height: 1.39;
  color: ${props => props.color || '#000'};
  text-align: ${props => props.align || 'left'};
  margin: ${props => props.margin}
}`

Text.displayName = 'Text'

export default Text
