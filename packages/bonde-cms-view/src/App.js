import React, { Component } from 'react';
import { Navbar } from './components/ui'
import PageStructure from './components/PageStructure'

const sections = [
  { id: 1, name: 'About', bgColor: 'yellow', position: 1 },
  { id: 2, name: 'Contact', bgColor: 'pink', position: 3 },
  { id: 3, name: 'Projects', bgColor: 'blue', position: 2 }
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
        // order by asc by position
        ordering={(s1, s2) => s1.position - s2.position}
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
