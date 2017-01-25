import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { Navigation } from 'react-router'
import reactMixin from 'react-mixin'

// Sibling module dependencies
import { selectors as CommunitySelectors } from '~community'

// Children module dependencies
import * as templatePaths from '~tmp-mobilizations/plugins/Templates/MobilizationTemplatesPaths'

// Current module dependencies
import { asyncAdd } from '../action-creators'
import * as MobilizationSelectors from '../selectors'
import MobilizationBasicsForm, { fields, validate } from '../components/mobilization-basics-form'

@reactMixin.decorate(Navigation)
export class MobilizationAddPage extends Component {

  onFinishSubmit () {
    const { mobilization } = this.props

    if (mobilization) {
      this.transitionTo(templatePaths.mobilizationTemplatesChoose(mobilization))
    }
  }

  render () {
    const { ...formProps } = this.props

    return (
      <div className='page-add'>
        <h2 className='h1 mt0 mb3 center'>Qual o objetivo da sua mobilização?</h2>
        <MobilizationBasicsForm
          className='bg-white'
          onFinishSubmit={this.onFinishSubmit.bind(this)}
          {...formProps}
        />
        <p className='lightgray center' style={{ fontSize: '.9rem', marginTop: '1.5rem' }}>
          Fique tranquil@ vc poderá editar depois se achar necessário.
        </p>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const mobilization = MobilizationSelectors.getCurrent(state) || {}
  const community = CommunitySelectors.getCurrent(state)
  return {
    mobilization: mobilization,
    initialValues: {
      ...mobilization,
      community_id: mobilization.community_id || community.id
    }
  }
}

const mapActionCreatorsToProps = {
  submit: asyncAdd
}

export default reduxForm({
  form: 'mobilizationAddForm',
  fields,
  validate
}, mapStateToProps, mapActionCreatorsToProps)(MobilizationAddPage)
