import React, { PropTypes, Component } from 'react'
import { reduxForm } from 'redux-form'
import { Navigation } from 'react-router'
import reactMixin from 'react-mixin'

import * as Paths from '../../../../Paths'
import { InputCounter } from '../../../../components'
import {
  FormRedux,
  FormGroup,
  ControlLabel,
  FormControl
} from '../../../../Dashboard/Forms'
import {
  MobilizationListItemAvatar,
  MobilizationListItemName
} from '../../../components/MobilizationList/MobilizationListItem'
import * as MobilizationTemplatesActions from '../MobilizationTemplatesActions'

@reactMixin.decorate(Navigation)
export class MobilizationTemplatesBasicsForm extends Component {
  render () {
    const {
      fields: { name, goal },
      mobilization,
      createTemplateAsync,
      ...rest
    } = this.props

    const next = () => this.transitionTo(Paths.mobilizationTemplatesList())

    const handleSubmit = values =>
      createTemplateAsync({ ...values, mobilization, global: false }, next)


    return (
      <div
        className="lg-col-5 mx-auto mt3"
        style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}
      >
        <div className="mobilization-list bg-white clearfix">
          <MobilizationListItemAvatar
            {...mobilization}
            imageSize={{ width: '100px', height: '100px' }}
          />
          <MobilizationListItemName
            {...mobilization}
            className="lg-col-8 darkengray"
            style={{ padding: 0, paddingTop: '15px', fontSize: '1.1rem' }}
          />
        </div>

        <div className="py3" style={{ textAlign: 'center' }}>
          <div className="arrow-down" />
        </div>

        <FormRedux {...rest} onSubmit={handleSubmit} className="bg-white ">
          <FormGroup controlId="name" {...name}>
            <ControlLabel>
              Nome do seu template
              <InputCounter
                maxLength={100}
                length={name.value ? name.value.length : 0}
                className="right regular"
              />
            </ControlLabel>
            <FormControl
              type="text"
              placeholder="Pela criação de uma delegacia de desaparecidos"
              maxLength={100}
            />
          </FormGroup>
          <FormGroup controlId="goal" {...goal}>
            <ControlLabel>
              Descrição
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
      </div>
    )
  }
}

MobilizationTemplatesBasicsForm.propTypes = {
  fields: PropTypes.object.isRequired,
  mobilization: PropTypes.object,
  createTemplateAsync: PropTypes.func.isRequired
}

const fields = ['name', 'goal']
const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Insira o nome do seu template'
  } else if (values.name.length > 100) {
    errors.name = 'O nome do seu template está muito longo!'
  }

  if (!values.goal) {
    errors.goal = 'Insira a descrição do seu template'
  } else if (values.goal.length > 500) {
    errors.goal = 'O limite de caracteres foi atingido.'
  }
  return errors
}
const mapStateToProps = (state, props) => ({
  initialValues: props.mobilization.template || {}
})

export default reduxForm({
  form: 'mobilizationTemplatesBasicsForm',
  fields,
  validate
}, mapStateToProps, MobilizationTemplatesActions)(MobilizationTemplatesBasicsForm)
