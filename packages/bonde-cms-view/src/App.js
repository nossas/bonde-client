import React, { Component } from 'react';

import PageStructure from './components/Page'

const sections = [
  { id: 1, name: 'About' },
  { id: 2, name: 'Projects' }
]

class App extends Component {
  render() {
    return (
      <PageStructure
        sections={sections}
      />
    );
  }
}

export default App;
