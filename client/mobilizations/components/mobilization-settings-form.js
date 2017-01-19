import React from 'react'
import {
  FormRedux,
  SubmitButton,
  SuccessMessage
} from '../../../scripts/Dashboard/Forms'
import { FloatLayout } from '../../../scripts/Dashboard/Grids'


export default ({ children, ...props }) => (
  <FormRedux nosubmit {...props}>
    {children}
    <FloatLayout position="floatTopRight">
      <SubmitButton>Salvar</SubmitButton>
      <SuccessMessage text="Dados editados com sucesso." />
    </FloatLayout>
  </FormRedux>
)
