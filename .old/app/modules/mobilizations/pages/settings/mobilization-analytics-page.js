import React from 'react'
import { reduxForm } from 'redux-form'
import { isValidCodeGA } from '../../../../util/validation-helper'
import { MobilizationSettingsForm } from '../../components'

import {
  FormGroup,
  FormControl,
  ControlLabel
} from '../../../../scripts/Dashboard/Forms'

import { mapStateToProps, mapActionCreatorsToProps } from './map-to-props'


const MobilizationAnalyticsPage = props => {

  const { fields: { google_analytics_code }, ...formProps } = props

  return (
    <div className='mobilization-analytics-page darkengray'>
      <p className='h5'>
        Para acompanhar os resultados da sua mobilização, você precisa configurar
        uma conta no Google Analytics.
      </p>
      <p className='h5'>Siga os passos abaixo:</p>
      <ol className='h5'>
        <li className='link'>
          Crie uma conta no Google
          Analytics <a href='http://www.google.com/analytics/' target='_blank'>
            clicando aqui
          </a>
        </li>
        <li>
          Obtenha sua ID de acompanhamento no Google Analytics. É um código
          que começa sempre com as letras UA, que você verá após criar sua conta lá.
        </li>
        <li className='m0'>
          Copie a ID de acompanhamento e cole no campo abaixo:
          <MobilizationSettingsForm {...formProps}>
            <FormGroup controlId='googleAnalyticsCodeId' {...google_analytics_code}>
              <ControlLabel>ID do Google Analytics</ControlLabel>
              <FormControl type='text' placeholder='UA-00000000-0' />
            </FormGroup>
          </MobilizationSettingsForm>
        </li>
        <li>
          Pronto! Você já pode acompanhar as estatísticas da sua mobilização
          no Google Analytics!
        </li>
      </ol>
    </div>
  )
}

const fields = ['id', 'google_analytics_code']

const validate = values => {
  const errors = {}
  if (values.google_analytics_code && !isValidCodeGA(values.google_analytics_code)) {
    errors.google_analytics_code = 'Informe uma ID válida'
  }
  return errors
}

export default reduxForm({
  form: 'mobilizationAnalyticsForm',
  fields,
  validate
}, mapStateToProps, mapActionCreatorsToProps)(MobilizationAnalyticsPage)
