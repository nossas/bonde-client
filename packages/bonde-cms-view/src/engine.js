import React from 'react'
import PropTypes from 'prop-types'
import { Navigation, Section, Widget } from './components'

class PageEngine extends React.Component { 

  render () {
    const {
      anchorLink,
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
          uuid={anchorLink}
          sections={sectionOrderedList}
          renderNavigation={renderNavigation}
          renderNavigationItem={renderNavigationItem}
        />
        <div>
          {sectionOrderedList.map((section, i) => (
            <Section
              key={`section-${i}`}
              uuid={anchorLink}
              section={section}
              renderSection={renderSection}
            >
              {relationship(section, widgets).map(w => {
                const plugin = plugins.filter(p => w.kind === p.kind)[0]
                
                // TODO: add unit tests to snippet code
                if (!plugin) throw new Error(`Plugin [kind=${w.kind}] not installed.`)
                if (!plugin.component) throw new Error(`Plugin [kind=${plugin.kind}] component not found.`)

                const { component: WidgetComponent } = plugin
                let widgetProps = {}
                if (plugin.props) {
                  widgetProps = plugin.props({ widget: w })
                }
                
                return (
                  <Widget renderWidget={renderWidget} widget={w}>
                    {WidgetComponent && (
                      <WidgetComponent widget={w} {...widgetProps} />
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

PageEngine.defaultProps = {
  sections: [],
  plugins: []
}

PageEngine.propTypes = {
  /**
   * Return path anchor link to navigate section,
   * receive section like args
   */
  anchorLink: PropTypes.func.isRequired,
  /**
   * Return a component to wrapper navigation
   * and receive { children } like props
   */
  renderNavigation: PropTypes.func,
  /**
   * Return a component to link section
   * and receive { section, href } like props
   */
  renderNavigationItem: PropTypes.func.isRequired,
  /**
   * Return a component wrapper section
   * and receive { section } like props
   */
  renderSection: PropTypes.func,
  /**
   * Return a component widget and receive { widget } like props
   */
  renderWidget: PropTypes.func.isRequired,
  /**
   * Return a list of widgets related section
   * receive section and widgets
   */
  relationship: PropTypes.func.isRequired,
  /**
   * Component render footer page
   */
  renderFooter: PropTypes.func,
  /**
   * Map of configurable plugins. For more details see: `src/engine.js`
   */
  plugins: PropTypes.arrayOf(PropTypes.shape({
    /** used to compare kind widget */
    kind: PropTypes.string,
    /** full render that represent widget ui */
    component: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.func
    ]),
    /** should return object with props to widget render */
    props: PropTypes.func
  }))
}

export default PageEngine
