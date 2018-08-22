import React from 'react'
import PropTypes from 'prop-types'

export default class extends React.Component {
  
  static defaultProps = {
    uuid: s => s.id,
    sections: [],
    renderNavigation: ({ children }) => <div>{children}</div>
  }

  static propTypes = {
    renderNavigationItem: PropTypes.func.isRequired
  }

  render () {
    const {
      uuid,
      sections,
      renderNavigation,
      renderNavigationItem
    } = this.props
   
    return renderNavigation({
      children: sections.map((section, i) => renderNavigationItem({
        section,
        href: `#${uuid(section)}`
      }))
    })
  }
}
