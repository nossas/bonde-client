import React from 'react'
import { browserHistory } from 'react-router'

import * as paths from '~client/paths'
import {
  SettingsPageLayout,
  SettingsPageMenuLayout,
  SettingsPageContentLayout
} from '~components/layout'
import { Avatar, Name } from '~mobilizations/components/list/items'
import { FormRedux, FormGroup, FormControl, ControlLabel } from '~components/forms'

const TemplatesCreatePage = ({ mobilization, fields: { name, goal }, ...formProps }) => (
  <SettingsPageLayout>
    <SettingsPageMenuLayout
      title='Crie um template a partir da mobilização'
      className='pb4'
    />
    <SettingsPageContentLayout
      wrapClassName='lg-col-5 mx-auto mt3'
      style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}
    >
      <div className='mobilization-list bg-white clearfix'>
        <Avatar
          {...mobilization}
          imageSize={{ width: '100px', height: '100px' }}
        />
        <Name
          {...mobilization}
          className='lg-col-8 darkengray'
          style={{ fontSize: '1.1rem' }}
        />
      </div>

      <div className='py3' style={{ textAlign: 'center' }}>
        <div className='arrow-down' />
      </div>

      <FormRedux
        className='bg-white'
        onFinishSubmit={() => {
          browserHistory.push(paths.mobilizations())
        }}
        {...formProps}
      >
        <FormGroup controlId='name' {...name}>
          <ControlLabel maxLength={100}>Nome do seu template</ControlLabel>
          <FormControl
            type='text'
            placeholder='Pela criação de uma delegacia de desaparecidos'
            maxLength={100}
          />
        </FormGroup>
        <FormGroup controlId='goal' {...goal}>
          <ControlLabel maxLength={500}>Descrição</ControlLabel>
          <FormControl
            componentClass='textarea'
            placeholder={'Faça um texto curto, capaz de motivar outras pessoas a se unirem à' +
              ' sua mobilização. Você poderá alterar este texto depois.'}
            maxLength={500}
            rows='4'
          />
        </FormGroup>
      </FormRedux>
    </SettingsPageContentLayout>
  </SettingsPageLayout>
)

export default TemplatesCreatePage
