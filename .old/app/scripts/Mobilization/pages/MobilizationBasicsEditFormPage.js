import React, { Component, PropTypes } from 'react'

import { MobilizationBasicsForm } from '../components/settings'
import { SettingsPageContentLayout } from '../../../components/Layout'

const MobilizationBasicsEditFormPage = props => (
  <SettingsPageContentLayout>
    <MobilizationBasicsForm
      {...props}
      className="transparent"
      floatButton="Salvar"
      successMessage="Formulário atualizado com sucesso!"
    />
  </SettingsPageContentLayout>
)

export default MobilizationBasicsEditFormPage
