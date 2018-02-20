import React from 'react'
import styled, { css } from 'styled-components'

export const Tab = styled.a`{
  display: block;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 13px;
  font-weight: 800;
  line-height: 1.15;
  color: ${props => props.inverted ? '#000' : '#fff'};
  text-transform: uppercase;
  cursor: pointer;
  margin: 0 15px 0 0;
  padding: 14px 0;
  ${props => props.active && css`
    border-bottom: 3px solid #ee0099;
    padding-bottom: 11px;
  `}

  &:hover, &:active {
    border-bottom: 3px solid #ee0099;
    padding-bottom: 11px;
  }
}`

const Tabs = ({ children, className, inverted }) => (
  <div className={className}>
    {children && children.map(child => React.cloneElement(child, { inverted }))}
  </div>
)

export default styled(Tabs)`{
  display: flex;
  align-items: center;
}`
