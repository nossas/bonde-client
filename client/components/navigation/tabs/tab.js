import React, { Component, PropTypes } from 'react'
import { Link, Navigation } from 'react-router'
import reactMixin from 'react-mixin'
import classnames from 'classnames'

import './tab.scss'

@reactMixin.decorate(Navigation)
class Tab extends Component {
  render() {
    const { text, index, path, isActive } = this.props
    if (path) {
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
    return (
      <span className={classnames("tab inline-block mr2 py2", isActive ? 'bold black' : null)}>
        <i
          className={classnames('circle center inline-block mr2', isActive ? 'bg-pagenta' : 'bg-gray94')}
        >
          {index}
        </i>
        {text}
      </span>
    )
  }
}

Tab.propTypes = {
  text: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  path: PropTypes.string,
  index: PropTypes.number
}

Tab.defaultProps = {
  isActive: false
}

export default Tab
