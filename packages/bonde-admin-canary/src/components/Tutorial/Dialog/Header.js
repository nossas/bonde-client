import React from 'react'
import { Title, Text } from 'bonde-styleguide'
import PropTypes from 'prop-types'

const Header = ({ title, description }) => (
  <React.Fragment>
    {title && (
      <Title.H3
        color='#fff'
        margin={{ bottom: 25 }}
      >
        {title}
      </Title.H3>
    )}
    {description && (
      <Text
        color='#fff'
        margin={{ bottom: 20 }}
      >
        {description}
      </Text>
    )}
  </React.Fragment>
)

Header.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string
}

export default Header
