import React from 'react'
import styled from 'styled-components'

const PageContainer = styled.div`{
  position: relative;
  padding-top: 34px;
  backgroud: ${props => props.bg || '#fff'};
}`

const PageContent = styled.div`{
  position: relative;
  display: flex;
  padding-top: 51px;
}`

export default ({ children, menuComponent: MenuComponent }) => (
  <PageContainer>
    {MenuComponent && <MenuComponent />}
    <PageContent>
    {children}
    </PageContent>
  </PageContainer>
)
