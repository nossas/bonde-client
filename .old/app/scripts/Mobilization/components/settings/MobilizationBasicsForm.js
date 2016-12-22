import React, { Component, PropTypes } from 'react'
import reactMixin from 'react-mixin'
import { reduxForm } from 'redux-form'
import { Navigation } from 'react-router'

import * as MobilizationActions from '../../MobilizationActions'
import * as Paths from '../../../Paths'
import { InputCounter } from '../../../components'
import {
  FormRedux,
  FormGroup,
  ControlLabel,
  FormControl
} from '../../../Dashboard/Forms'

@reactMixin.decorate(Navigation)
class MobilizationBasicsForm extends Component {
  render() {
    const {
      fields: { name, goal },
      mobilization,
      // Actions
      addMobilizationAsync,
      editMobilizationAsync,
      community_id,
      ...rest
    } = this.props

    const submitStrategy = mobilization ? editMobilizationAsync : addMobilizationAsync
    const next = mobilization ? undefined :
      mobilization => this.transitionTo(Paths.mobilizationTemplatesChoose(mobilization))

    const handleSubmit = values => submitStrategy({ ...mobilization, ...values, community_id }, next)

    return (
      <FormRedux {...rest} onSubmit={handleSubmit}>
        <FormGroup controlId="name" {...name}>
          <ControlLabel>
            Nome
            <InputCounter
              maxLength={100}
              length={name.value ? name.value.length : 0}
              className="right regular"
            />
          </ControlLabel>
          <FormControl
            type="text"
            placeholder="Ex: Pela criação de uma delegacia de desaparecidos"
            maxLength={100}
          />
        </FormGroup>
        <FormGroup controlId="goal" {...goal}>
          <ControlLabel>
            Objetivo
            <InputCounter
              maxLength={500}
              length={goal.value ? goal.value.length : 0}
              className="right regular"
            />
          </ControlLabel>
          <FormControl
            componentClass='textarea'
            placeholder={'Faça um texto curto, capaz de motivar outras pessoas a se unirem à'
              + ' sua mobilização. Você poderá alterar este texto depois.'}
            maxLength={500}
            rows="4"
          />
        </FormGroup>
      </FormRedux>
    )
  }
}

MobilizationBasicsForm.contextTypes = {
  router: PropTypes.object.isRequired
}

MobilizationBasicsForm.propTypes = {
  fields: PropTypes.object.isRequired,
  mobilization: PropTypes.object,
  // Actions
  editMobilizationAsync: PropTypes.func.isRequired,
  addMobilizationAsync: PropTypes.func.isRequired
}

const fields = ['name', 'goal']
const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Insira o nome da mobilização'
  } else if (values.name.length > 100) {
    errors.name = 'Seu título está muito longo!'
  }

  if (!values.goal) {
    errors.goal = 'Insira o objetivo da mobilização'
  } else if (values.goal.length > 500) {
    errors.goal = 'O limite de caracteres foi atingido.'
  }
  return errors
}
const mapStateToProps = (state, props) => {
  return {
    initialValues: props.mobilization || { color_scheme: 'meurio-scheme' },
    community_id: state.community.currentId,
  }
}

export default reduxForm({
  form: 'mobilizationForm',
  fields,
  validate
}, mapStateToProps, MobilizationActions)(MobilizationBasicsForm)
