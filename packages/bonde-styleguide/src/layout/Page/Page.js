import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const PageContainer = styled.div`{
  position: relative;
  padding: 32px 155px 0;
  background-color: ${props => props.bgColor || '#fff'};
}`

const PageContent = styled.div`{
  position: relative;
  display: flex;
  padding-top: 51px;
}`

const Page = ({ children, menuComponent: MenuComponent, bgColor }) => (
  <PageContainer bgColor={bgColor}>
    {MenuComponent && <MenuComponent />}
    <PageContent>
    {children}
    </PageContent>
  </PageContainer>
)

const { oneOfType, node, func, string } = PropTypes

Page.propTypes = {
  /** The content of the page. */
  children: oneOfType([node, func]),
  /** The menu component. */
  menuComponent: oneOfType([node, func]),
  /** The background color of the page. */
  bgColor: string
}

export default Page
