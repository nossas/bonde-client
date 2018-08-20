import React from 'react'
import PropTypes from 'prop-types'
import { Footer, Navigation, Section } from './defaults'

export default class extends React.Component {

  static defaultProps = {
    sections: []
  }

  static propTypes = {
    // return path anchor link to navigation on section
    // receive a section object
    anchor: PropTypes.func.isRequired,
    // return a component to wrapper navigation
    // receive an object { children }
    renderNavigation: PropTypes.func,
    // return a component to link section
    // receive an object { section, href }
    renderNavigationItem: PropTypes.func.isRequired,
    // return a component wrapper section
    // receive a object { section }
    renderSection: PropTypes.func
  }

  render () {
    const {
      anchor,
      sections,
      renderNavigation,
      renderNavigationItem,
      renderSection
    } = this.props

    return (
      <div>
        <Navigation
          uuid={anchor}
          sections={sections}
          renderNavigation={renderNavigation}
          renderNavigationItem={renderNavigationItem}
        />
        <div>
          {sections.map((section, i) => (
            <Section
              key={`section-${i}`}
              uuid={anchor}
              section={section}
              renderSection={renderSection}
            />
          ))}
        </div>
        <Footer />
      </div>
    )
  }
}
