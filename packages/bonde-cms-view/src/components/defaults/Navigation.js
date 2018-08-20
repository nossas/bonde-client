import React from 'react'
import PropTypes from 'prop-types'

export default class extends React.Component {
  
  static defaultProps = {
    uuid: s => s.id,
    sections: []
  }

  static propTypes = {
    renderNavigationItem: PropTypes.func.isRequired
  }

  render () {
    const { uuid, sections, renderNavigationItem } = this.props
    
    return (
      <div>
        {sections.map((section, i) => renderNavigationItem({
          section,
          href: `#${uuid(section)}`
        }))}
      </div>
    )
  }
}
