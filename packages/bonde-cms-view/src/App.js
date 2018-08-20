import React, { Component } from 'react';

import PageStructure from './components/Page'

const sections = [
  { id: 1, name: 'About', bgColor: 'yellow' },
  { id: 2, name: 'Projects', bgColor: 'pink' }
]

const Navigation = ({ children }) => {
 
  const styles = {
    height: '50px',
    backgroundColor: 'black',
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

const SectionBackground = ({ section }) => {
  const styles = {
    width: '100%',
    height: '500px',
    backgroundColor: section.bgColor
  } 
  return (
    <div style={styles} />
  )
}

class App extends Component {
  render() {
    return (
      <PageStructure
        anchor={s => `section-${s.id}`}
        sections={sections}
        renderNavigation={Navigation}
        renderNavigationItem={NavigationItem}
        renderSection={SectionBackground}
      />
    );
  }
}

export default App;
