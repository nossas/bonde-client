import React, { Component } from 'react';

import PageStructure from './components/Page'

const sections = [
  { id: 1, name: 'About', bgColor: 'yellow' },
  { id: 2, name: 'Projects', bgColor: 'pink' }
]

const widgets = [
  { kind: 'content', sectionId: 1 },
  { kind: 'draft', sectionId: 2 },
  { kind: 'pressure', sectionId: 2 }
]

const Navigation = ({ children }) => {
 
  const styles = {
    position: 'fixed',
    width: '100%',
    height: '50px',
    backgroundColor: 'rgba(0,0,0,0.5)',
    textAlign: 'center'
  }

  return (
    <div style={styles}>
      {children}
    </div>
  )
}

const NavigationItem = ({ section, href }) => (
  <a href={href} title={section.name}>
    {section.name}
  </a>
)

const SectionBackground = ({ children, section }) => {
  const styles = {
    width: '100%',
    height: '1000px',
    backgroundColor: section.bgColor
  } 
  return (
    <div style={styles}>
      {children}
    </div>
  )
}

const Widget = ({ widget }) => (
  <div>
    {widget.kind}
  </div>
)

class App extends Component {
  render() {
    return (
      <PageStructure
        anchor={s => `section-${s.id}`}
        relationship={(section, widgets) => widgets.filter(({ sectionId }) => section.id === sectionId)}
        sections={sections}
        widgets={widgets}
        renderNavigation={Navigation}
        renderNavigationItem={NavigationItem}
        renderSection={SectionBackground}
        renderWidget={Widget}
      />
    );
  }
}

export default App;
