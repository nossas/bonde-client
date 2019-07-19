import React from 'react'
import { BondeDiagram, BondeDiagramApplication } from './lib'
import './lib/sass/main.scss'

function App() {

  const app = new BondeDiagramApplication()
  
  const serialize = () => {
    console.log('Diagram', app.getActiveDiagram().serializeDiagram())
  }

  return (
    <div className="App">
      <h1>Bonde Diagram | <button onClick={serialize}>Serialize</button></h1>
      <BondeDiagram app={app} />
    </div>
  );
}

export default App;
