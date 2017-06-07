import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addNotification as notify } from 'reapop'
import { injectIntl, intlShape } from 'react-intl'
import { slugUpdatedMessage } from '~client/utils/notifications'

// Global module dependencies
import { slugify } from '~client/utils/string-helper'
import {
  FormRedux,
  FormGroup,
  ControlLabel,
  FormControl
} from '~client/components/forms'

// Current module dependencies
import { SettingsForm } from '~client/ux/components'

class MobilizationBasicsForm extends Component {

  render () {
    const { floatSubmit, fields: { name, slug, goal }, ...formProps } = this.props

    const ComponentForm = floatSubmit ? SettingsForm : FormRedux

    const nameInputProps = {
      ...name,
      onBlur: evt => {
        if (!slug.value) {
          slug.onChange(slugify(name.value))
        }
        name.onBlur(evt)
      }
    }

    return (
      <ComponentForm {...formProps}>
        <FormGroup controlId='name' {...nameInputProps}>
          <ControlLabel maxLength={100}>Nome</ControlLabel>
          <FormControl
            type='text'
            placeholder='Ex: Pela criação de uma delegacia de desaparecidos'
            maxLength={100}
          />
        </FormGroup>
        <FormGroup controlId='slug' {...slug}>
          <ControlLabel maxLength={63}>Slug</ControlLabel>
          <FormControl
            type='text'
            maxLength={63}
          />
        </FormGroup>
        <FormGroup controlId='goal' {...goal}>
          <ControlLabel maxLength={500}>Objetivo</ControlLabel>
          <FormControl
            componentClass='textarea'
            placeholder={'Faça um texto curto, capaz de motivar outras pessoas a se unirem à' +
              ' sua mobilização. Você poderá alterar este texto depois.'}
            maxLength={500}
            rows='4'
          />
        </FormGroup>
      </ComponentForm>
    )
  }
}

export const fields = ['name', 'slug', 'goal', 'community_id']

export const validate = values => {
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

  if (!values.slug) {
    errors.slug = 'Insira o slug da mobilização'
  } else if (values.slug.length > 63) {
    errors.slug = 'Seu slug está muito longo!'
  }

  return errors
}

const mapActionsCreators = (dispatch, props) => ({
  ...props,
  submit: values => {
    props.submit(values)
      .then(mobilization => {
        if (mobilization.slug !== props.mobilization.slug) {
          dispatch(notify(slugUpdatedMessage(props.intl)))
        }
      })
  }
})

MobilizationBasicsForm.propTypes = {
  intl: intlShape.isRequired
}

export default injectIntl(
  connect(undefined, mapActionsCreators)(MobilizationBasicsForm)
)
