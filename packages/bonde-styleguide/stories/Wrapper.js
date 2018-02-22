import React from 'react'
import styled, { css } from 'styled-components'

export default styled.div`{
  position: ${props => props.position || 'fixed'};
  width: ${props => props.width ? `${props.width}px` : '100%'};
  height: 100%;
  ${props => !props.position && css`
    display: flex;
    align-items: center;
    justify-content: center;
  `}
  background-color: ${props => props.bg || '#fff'};
  font-family: Nunito Sans, Source Sans Pro, Arial;
}`
