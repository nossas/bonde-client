import React from 'react'

export default class extends React.Component {
  
  static defaultProps = {
    uuid: s => s.id,
    sections: []
  }

  render () {
    const { uuid, sections } = this.props
    
    return (
      <div>
        {sections.map((section, i) => (
          <a
            key={`navigation-${i}`} 
            href={`#${uuid(section)}`}
          />
        ))}
      </div>
    )
  }
}
