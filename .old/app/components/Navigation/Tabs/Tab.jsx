import React, { Component, PropTypes } from 'react'
import { Link, Navigation } from 'react-router'
import reactMixin from 'react-mixin'
import classnames from 'classnames'

import './scss/tab.scss'

@reactMixin.decorate(Navigation)
class Tab extends Component {
  render() {
    const { text, path, isActive } = this.props
    return (
      <Link
        to={path}
        className={classnames(
          'tab btn border-only-bottom px0 py2 mr3 inline-block',
          isActive ? 'h4 is-active' : null
        )}
      >
        {text}
      </Link>
    )
  }
}

Tab.propTypes = {
  text: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  path: PropTypes.string
}

Tab.defaultProps = {
  path: ' ',
  isActive: false
}

export default Tab
