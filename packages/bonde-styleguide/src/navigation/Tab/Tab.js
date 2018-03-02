import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import TabItem from '../TabItem/TabItem'

const Tab = styled(({ children, className, inverted }) => (
  <div className={className}>
    {children && children.map(child => (
      React.cloneElement(child, { inverted, key: Math.random() })
    ))}
  </div>
))`{
  display: flex;
  align-items: center;
}`

const { oneOfType, instanceOf, arrayOf, node, bool } = PropTypes

Tab.propTypes = {
  /** Use the `TabItem` component as children to compose. */
  children: oneOfType([
    node,
    instanceOf(TabItem),
    arrayOf(TabItem)
  ]).isRequired,
  /** Invert the `TabItem`s color style. */
  inverted: bool
}

Tab.defaultProps = {
  inverted: false
}

/* @component */
export default Tab
