import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { Navigation } from 'react-router'
import reactMixin from 'react-mixin'

// Global module dependencies
import * as paths from '~client/paths'
import {
  SettingsPageLayout,
  SettingsPageMenuLayout,
  SettingsPageContentLayout
} from '~components/layout'
import { Avatar, Name } from '~mobilizations/components/list/items'
import { FormRedux, FormGroup, FormControl, ControlLabel } from '~tmp-dashboard/forms'

// Parent module dependencies
import * as MobilizationSelectors from '~mobilizations/selectors'

// Current module dependencies
import { asyncCreateTemplate } from '../action-creators'

@reactMixin.decorate(Navigation)
class TemplateCreatePage extends Component {

  onFinishSubmit () {
    this.transitionTo(paths.mobilizations())
  }

  render () {
    const {
      mobilization,
      fields: { name, goal },
      ...formProps
    } = this.props

    return (
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
            onFinishSubmit={this.onFinishSubmit.bind(this)}
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
  }
}

const fields = ['name', 'goal', 'mobilization_id', 'global']

const mapStateToProps = (state, ownProps) => {
  const mobilization = MobilizationSelectors.getTemplate(state)

  return {
    mobilization,
    initialValues: {
      mobilization_id: mobilization.id,
      global: false
    }
  }
}

const mapActionCreatorsToProps = {
  submit: asyncCreateTemplate
}

export default reduxForm({
  form: 'templateCreateForm',
  fields
}, mapStateToProps, mapActionCreatorsToProps)(TemplateCreatePage)
