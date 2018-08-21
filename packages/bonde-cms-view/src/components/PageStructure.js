import React from 'react'
import PropTypes from 'prop-types'
import { Navigation, Section, Widget } from './defaults'

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
    renderSection: PropTypes.func,
    // return a component widget
    // receive a object { widget }
    renderWidget: PropTypes.func.isRequired,
    // return a list of widgets related section
    // receive section and widgets
    relationship: PropTypes.func.isRequired,
    // return a component footer
    renderFooter: PropTypes.func
  }

  render () {
    const {
      anchor,
      sections,
      widgets,
      relationship,
      renderNavigation,
      renderNavigationItem,
      renderSection,
      renderWidget,
      renderFooter
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
            >
              {relationship(section, widgets).map(w => (
                <Widget renderWidget={renderWidget} widget={w} />
              ))}
            </Section>
          ))}
        </div>
        {renderFooter && renderFooter()}
      </div>
    )
  }
}
