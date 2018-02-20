import React from 'react'
import styled from 'styled-components'

export default styled.p`{
  font-family: 'Nunito Sans', sans-serif;
  font-size: 18px; 
  font-weight: normal;
  line-height: 1.39;
  color: ${props => props.color || '#000'};
  text-align: ${props => props.align || 'left'};
}`
