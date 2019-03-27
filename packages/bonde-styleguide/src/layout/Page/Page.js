import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const PageContainer = styled.div`{
  padding-top: ${props => props.top ? `calc(${props.top}px + 32px)` : '32px'};
  padding-bottom: 32px;
  width: 80%;
  margin: 0 auto;
`

const PageContent = styled.div`{
  display: flex;
}`

const Page = ({ children, menuComponent: MenuComponent, top }) => (
  <PageContainer top={top}>
    {MenuComponent && <MenuComponent />}
    <PageContent>
    {children}
    </PageContent>
  </PageContainer>
)

const { oneOfType, node, func } = PropTypes

Page.propTypes = {
  /** The content of the page. */
  children: oneOfType([node, func]),
  /** The menu component. */
  menuComponent: oneOfType([node, func])
}

Page.displayName = 'Page'

export default Page
