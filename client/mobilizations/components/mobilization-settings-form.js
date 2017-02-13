import React from 'react'

// Global module dependencies
import {
  FormRedux,
  Button,
  SuccessMessage
} from '~components/forms'
import { FloatLayout } from '~components/grids'

const MobilizationSettingsForm = ({ children, ...props }) => (
  <FormRedux nosubmit {...props}>
    {children}
    <FloatLayout position='floatTopRight'>
      <Button>Salvar</Button>
      <SuccessMessage text='Dados editados com sucesso.' />
    </FloatLayout>
  </FormRedux>
)

export default MobilizationSettingsForm
