import React from 'react'

// Global module dependencies
import {
  FormRedux,
  SubmitButton,
  SuccessMessage
} from '~components/forms'
import { FloatLayout } from '~tmp-dashboard/Grids'

const MobilizationSettingsForm = ({ children, ...props }) => (
  <FormRedux nosubmit {...props}>
    {children}
    <FloatLayout position='floatTopRight'>
      <SubmitButton>Salvar</SubmitButton>
      <SuccessMessage text='Dados editados com sucesso.' />
    </FloatLayout>
  </FormRedux>
)

export default MobilizationSettingsForm
