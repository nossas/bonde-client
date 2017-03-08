import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import classnames from 'classnames'

if (process.env.BROWSER) require('./tab.scss')

class Tab extends Component {
  render () {
    const { text, index, path, isActive, className, style } = this.props
    if (path) {
      return (
        <Link
          to={path}
          className={classnames(
            'tab btn border-only-bottom px0 py2 mr3 inline-block',
            isActive ? 'h4 is-active' : null,
            className
          )}
          style={style}
        >
          {text}
        </Link>
      )
    }
    return (
      <span style={style} className={classnames(
        'tab inline-block py2 mr2',
        isActive ? 'bold black' : null,
        className
      )}>
        <i className={classnames(
          'circle center inline-block',
          isActive ? 'bg-pagenta' : 'bg-gray94',
        text ? 'mr2' : null
        )}>
          {index}
        </i>
        {text}
      </span>
    )
  }
}

Tab.propTypes = {
  text: PropTypes.string,
  isActive: PropTypes.bool,
  path: PropTypes.string,
  index: PropTypes.number
}

Tab.defaultProps = {
  isActive: false
}

export default Tab
