import React from 'react'

export default class extends React.Component {
  
  static defaultProps = {
    uuid: s => s.id,
    section: {},
    renderSection: () => {}
  }

  render() {   
    const {
      children,
      uuid,
      section,
      renderSection
    } = this.props

    return (
      <div id={uuid(section)}>
        {renderSection({ section, children })}
      </div>
    )
  }
}
