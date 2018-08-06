import React from 'react'
import Text from '../Text/Text'

const createTitle = (element, { displayName, ...defaultTextOpts}) =>
  ({ children, ...props }) => {
    const Title = Text.withComponent(element)
    Title.displayName = displayName

    return (
      <Title {...defaultTextOpts} {...props}>
        {children}
      </Title>
    )
  }

const H1 = createTitle('h1', {
  displayName: 'Title.H1',
  fontSize: 60,
  fontWeight: 900,
  lineHeight: 1,
  color: '#000'
})

H1.displayName = 'Title H1'

const H2 = createTitle('h2', {
  displayName: 'Title.H2',
  fontSize: 36,
  fontWeight: 900,
  lineHeight: 1.22,
  color: '#000'
})

H2.displayName = 'Title.H2'

const H3 = createTitle('h3', {
  displayName: 'Title.H3',
  fontSize: 21,
  fontWeight: 800,
  lineHeight: 0.95,
  color: '#000'
})

H3.displayName = 'Title.H3'

const H4 = createTitle('h4', {
  displayName: 'Title.H4',
  fontSize: 18,
  fontWeight: 'normal',
  lineHeight: 1.39,
  color: '#424242'
})

H4.displayName = 'Title.H4'

const H5 = createTitle('h5', {
  displayName: 'Title.H5',
  fontSize: 13,
  lineHeight: 1.54,
  color: '#424242'
})

H5.displayName = 'Title.H5'

const H6 = createTitle('h6', {
  displayName: 'Title.H6',
  fontSize: 11,
  lineHeight: 2.27,
  color: '#424242'
})

H6.displayName = 'Title.H6'

/**
 * The title options component.
 */
const Title = { H1, H2, H3, H4, H5, H6 }

/* @component */
export default Title
