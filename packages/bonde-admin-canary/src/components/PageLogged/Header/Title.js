import React from 'react'
import { Title } from 'bonde-styleguide'
import PropTypes from 'prop-types'

const TitleWrapper = ({ children }) => <Title.H3 color='#fff'>{children}</Title.H3>

TitleWrapper.propTypes = {
  children: PropTypes.node
}

export default TitleWrapper
