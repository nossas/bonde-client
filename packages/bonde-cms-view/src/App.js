import React, { Component } from 'react';
import { Navbar } from './components/ui'
import PageStructure from './components/PageStructure'

const sections = [
  { id: 1, name: 'About', bgColor: 'yellow' },
  { id: 2, name: 'Projects', bgColor: 'pink' }
]

const widgets = [
  { kind: 'content', sectionId: 1 },
  { kind: 'draft', sectionId: 2 },
  { kind: 'pressure', sectionId: 2 }
]

const SectionBackground = ({ children, section }) => {
  const styles = {
    width: '100%',
    height: '400px',
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

const Footer = () => {
  const styles = {
    height: '50px',
    backgroundColor: 'black'
  }
  
  return (
    <div style={styles}>
      <p>Footer</p>
    </div>
  )
}

class App extends Component {
  render() {
    return (
      <PageStructure
        anchor={s => `section-${s.id}`}
        relationship={(section, widgets) => widgets.filter(({ sectionId }) => section.id === sectionId)}
        sections={sections}
        widgets={widgets}
        renderNavigation={Navbar}
        renderNavigationItem={Navbar.Item}
        renderSection={SectionBackground}
        renderWidget={Widget}
        renderFooter={Footer}
      />
    );
  }
}

export default App;
