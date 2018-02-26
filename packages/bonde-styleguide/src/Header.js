import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import * as Icon from './Icon'
import Title from './Title'

const Container = styled.div`{
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
}`

const Header = styled(({
  children,
  className,
  pageTitle,
  navbar: Navbar,
  actionButton: ActionButton,
  tabNavigation: Tabs
}) => (
  <div className={className}>
    {Navbar && <Navbar />}
    <Container>
      {pageTitle && <Title.H3 color='#fff'>{pageTitle}</Title.H3>}
      {ActionButton && <ActionButton />}
    </Container>
    {Tabs && <Tabs />}
  </div>
))`{
  position: relative;
  width: inherit;
  min-height: 80px;
  background: #000;
  padding: 28px 155px 0;
}`

Header.displayName = 'Header'

export default Header
