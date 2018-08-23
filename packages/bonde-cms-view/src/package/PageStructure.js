import React from 'react'
import PropTypes from 'prop-types'
import { Navigation, Section, Widget } from './defaults'

export default class extends React.Component {

  static defaultProps = {
    sections: [],
    plugins: []
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
    renderFooter: PropTypes.func,
    // array of object { kind, component }
    // object.kind compare to widget.kind to render component
    // object.component receive widget like props
    plugins: PropTypes.array
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
      renderFooter,
      ordering,
      plugins
    } = this.props

    const sectionOrderedList = ordering
      ? sections.sort(ordering)
      : sections

    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Navigation
          uuid={anchor}
          sections={sectionOrderedList}
          renderNavigation={renderNavigation}
          renderNavigationItem={renderNavigationItem}
        />
        <div>
          {sectionOrderedList.map((section, i) => (
            <Section
              key={`section-${i}`}
              uuid={anchor}
              section={section}
              renderSection={renderSection}
            >
              {relationship(section, widgets).map(w => {
                const plugin = plugins.filter(p => w.kind === p.kind)[0]
                
                // TODO: add unit tests to snippet code
                if (!plugin) throw new Error(`Plugin [kind=${w.kind}] not installed.`)
                if (!plugin.component) throw new Error(`Plugin [kind=${plugin.kind}] component not found.`)

                const { component: WidgetComponent } = plugin
                
                return (
                  <Widget renderWidget={renderWidget} widget={w}>
                    {WidgetComponent && (
                      <WidgetComponent
                        widget={w}
                        config={plugin.config}
                      />
                    )}
                  </Widget>
                )
              })}
            </Section>
          ))}
        </div>
        {renderFooter && renderFooter()}
      </div>
    )
  }
}
