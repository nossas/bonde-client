import React, { Component } from 'react';

import PageStructure from './components/Page'

const sections = [
  { id: 1, name: 'About' },
  { id: 2, name: 'Projects' }
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

class App extends Component {
  render() {
    return (
      <PageStructure
        anchor={s => `section-${s.id}`}
        sections={sections}
        renderNavigation={Navigation}
        renderNavigationItem={NavigationItem}
      />
    );
  }
}

export default App;
