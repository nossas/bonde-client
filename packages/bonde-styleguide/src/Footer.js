import React from 'react'
import styled from 'styled-components'
import { Button } from '../src'

const FooterContent = styled.div`{
  flex-grow: 1;
  padding: 0 0 0 84.7px;

  & a {
    font-family: 'Nunito Sans', sans-serif;
    font-size: 13px;
    font-weight: 800;
    text-transform: uppercase;
    text-decoration: none;
    margin-right: 35px;
    color: #fff;

    &:hover {
      text-decoration: underline;
    }
  }
}`

const Footer = styled(({ children, className, btnHelpLabel, btnHelpClick }) => (
  <div className={className}>
    <img src='http://via.placeholder.com/150x30?text=BONDE' />
    <FooterContent>
    {children}
    </FooterContent>
    {btnHelpLabel && btnHelpClick && (
      <Button onClick={btnHelpClick}>{btnHelpLabel}</Button>
    )}
  </div>
))`{
  display: flex;
  align-items: center;
  height: 94px;
  background: #000;
  padding: 0 150px 0;
}`

Footer.displayName = 'Footer'

export default Footer
