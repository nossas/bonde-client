import React from 'react'
import styled from 'styled-components'

const Container = styled.div`{
  position: relative;
  padding-top: 34px;
  backgroud: ${props => props.bg || '#fff'};
}`

export default ({ children, menuComponent: MenuComponent }) => (
  <Container>
    {MenuComponent && <MenuComponent />}
    <div className='ScrollingContent'>
    {children}
    </div>
  </Container>
)
