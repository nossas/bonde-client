import React from 'react'
import styled from 'styled-components'
import { Button } from '../src'

const FooterContent = styled.div`{
  flex-grow: 1;
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
