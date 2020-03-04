import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { px } from '../../../utils'

const PageContainer = styled.div`
  padding: ${props => props.top ? `calc(${props.top}px + 0)` : '0'} 0 0;
  width: 100%;
  margin: 0 auto;
  ${props => props.height && `height: ${px(props.height)};`}
`

const PageContent = styled.div`
  height: 100%;
  ${props => props.padding && `padding: ${props.padding};`}
`

const Page = ({ children, style, menuComponent: MenuComponent, top, padding, height }) => (
  <PageContainer top={top} height={height} style={style}>
    {MenuComponent && <MenuComponent />}
    <PageContent padding={padding}>
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

/** @component */
export default Page
