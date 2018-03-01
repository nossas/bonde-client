import React from 'react'
import styled from 'styled-components'
import Text from './Text'

const createTitle = (element, { displayName, ...defaultTextOpts}) =>
  ({ children, ...props }) => {
    const Title = Text.withComponent(element)
    Title.displayName = displayName
  
    return (
      <Title {...props} {...defaultTextOpts}>
        {children}
      </Title>
    )
  }

const H1 = createTitle('h1', {
  displayName: 'Title.H1',
  fontSize: 44,
  fontWeight: 900,
  lineHeight: 1.14
})

H1.displayName = 'Title H1'

const H2 = createTitle('h2', {
  displayName: 'Title.H2',
  fontSize: 32,
  fontWeight: 900,
  lineHeight: 1.12
})

H2.displayName = 'Title.H2'

const H3 = createTitle('h3', {
  displayName: 'Title.H3',
  fontSize: 21,
  fontWeight: 800,
  lineHeight: 0.95
})

H3.displayName = 'Title.H3'

export default { H1, H2, H3 }
