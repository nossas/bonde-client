import React from 'react'
import { Footer, Navigation, Section } from './defaults'

export default class extends React.Component {

  static defaultProps = {
    anchor: s => `section-${s.id}`,
    sections: []
  }

  render () {
    const { anchor, sections } = this.props

    return (
      <div>
        <Navigation uuid={anchor} sections={sections} />
        <div>
          {sections.map((section, i) => (
            <Section
              key={`section-${i}`}
              uuid={anchor}
              section={section}
            />
          ))}
        </div>
        <Footer />
      </div>
    )
  }
}
