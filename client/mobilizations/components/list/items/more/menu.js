import React, { PropTypes } from 'react'
import classnames from 'classnames'

// Current module dependencies
if (process.env.BROWSER) require('./menu.scss')

const Menu = ({ active, children }) => (
  <div className={classnames('menu', { 'show': active })}>
    {children}
  </div>
)

Menu.contextTypes = {
  router: PropTypes.object.isRequired
}

Menu.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
}

Menu.defaultProps = {
  active: false
}

export default Menu
