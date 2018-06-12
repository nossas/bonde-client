import React from 'react'
import { Grid, Cell } from 'bonde-styleguide'
import { TutorialProvider, TutorialDialog } from '../../components/Tutorial'

const BoxStyles = ({ color }) => ({
  display: 'block',
  backgroundColor: color,
  width: '100%',
  height: '150px'
})

const Box = ({ name, color }) => (
  <div style={BoxStyles({ color })}>
    {name}
  </div>
)

export default () => (
  <TutorialProvider>
    <TutorialDialog
      name='tutorial-step-0'
      step={0}
      title='Step Title'
      description='Step Description'
    >
      <h1>Test page</h1>
    </TutorialDialog>

    <TutorialDialog
      name='tutorial-step-1'
      step={1}
      title='Step Title'
      description='Step Description'
    >
      <h1>Test page</h1>
    </TutorialDialog>

    <Box name='step1' color='blue' />
    <Box name='step2' color='green' />

    <Grid>
      <Cell size={[4, 4, 4]}>
          <Box name='step3' color='pink' />
      </Cell>
      <Cell size={[4, 4, 4]}>
        <TutorialDialog
          name='tutorial-step-2'
          step={2}
          title='Step Title'
          description='Step Description'
        >
          <Box name='step4' color='purple' />
        </TutorialDialog>
      </Cell>
    </Grid>
  </TutorialProvider>
)