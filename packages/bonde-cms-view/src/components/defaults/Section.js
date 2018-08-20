import React from 'react'

export default class extends React.Component {
  
  static defaultProps = {
    uuid: s => s.id,
    section: {},
    renderSection: () => {}
  }

  render() {   
    const {
      uuid,
      section,
      renderSection
    } = this.props
    
    // TODO: render plugins
    const children = []

    return (
      <div id={uuid(section)}>
        {renderSection({ section })}
      </div>
    )
  }
}
