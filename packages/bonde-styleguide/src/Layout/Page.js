import React from 'react'
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

export default ({ children, menuComponent: MenuComponent, bgColor }) => (
  <PageContainer bgColor={bgColor}>
    {MenuComponent && <MenuComponent />}
    <PageContent>
    {children}
    </PageContent>
  </PageContainer>
)
