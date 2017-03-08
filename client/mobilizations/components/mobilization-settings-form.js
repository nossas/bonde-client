import React from 'react'

import { FormRedux, Button, SuccessMessage } from '~components/forms'
import { FloatLayout } from '~components/grids'

const MobilizationSettingsForm = ({ children, ...props }) => (
  <FormRedux nosubmit {...props}>
    {children}
    <FloatLayout position='floatTopRight'>
      <Button type='submit' className='btn bg-blacker rounded white'>
        {props.submitting ? 'Salvando...' : 'Salvar'}
      </Button>
      <SuccessMessage text='Dados editados com sucesso.' />
    </FloatLayout>
  </FormRedux>
)

export default MobilizationSettingsForm
