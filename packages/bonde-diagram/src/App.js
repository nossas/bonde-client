import React from 'react'
import {
  Grid,
  Cell,
  Flexbox2 as Flexbox
} from 'bonde-styleguide'
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
      <Flexbox vertical>
        <Grid>
          <Cell size={[12, 12, 12]}>
            <BondeDiagram app={app} />
          </Cell>
        </Grid>
      </Flexbox>
    </div>
  )
}

export default App
