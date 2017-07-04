import React from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { addNotification as notify } from 'reapop'
import { injectIntl, intlShape } from 'react-intl'
import { Info } from '~client/components/notify'
import { slugUpdatedMessage } from '~client/utils/notifications'
import { slugify } from '~client/utils/string-helper'
import { SettingsForm } from '~client/ux/components'
import { Code } from '~client/components/markdown'
import {
  FormRedux,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock
} from '~client/components/forms'
import * as paths from '~client/paths'

export const MobilizationBasicsForm = ({
  fields: { name, slug, goal },
  floatSubmit,
  ...formProps
}) => {
  const ComponentForm = floatSubmit ? SettingsForm : FormRedux
  const { location: { pathname } } = formProps
  const isNewMobilizationPath = pathname === paths.newMobilization()

  return (
    <ComponentForm {...formProps}>
      <FormGroup
        {...name}
        controlId='name'
        onBlur={event => {
          if (!slug.value) slug.onChange(slugify(name.value))
          name.onBlur(event)
        }}
      >
        <ControlLabel maxLength={100}>Nome</ControlLabel>
        <FormControl
          type='text'
          placeholder='Ex: Pela criação de uma delegacia de desaparecidos'
          maxLength={100}
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
      <FormGroup
        {...slug}
        controlId='slug'
        className={classnames({ hide: isNewMobilizationPath })}
      >
        <ControlLabel maxLength={63}>Identificador Único</ControlLabel>
        <HelpBlock>
          O valor desse campo é utilizado para referenciar a mobilização no domínio do BONDE,
          por exemplo: <Code bordered>www.123-nome-da-mob.bonde.org</Code>
        </HelpBlock>
        <FormControl
          type={isNewMobilizationPath ? 'hidden' : 'text'}
          maxLength={63}
          placeholder='Ex: 123-nome-da-mob'
        />
      </FormGroup>
    </ComponentForm>
  )
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

  if (values.slug && values.slug.length > 63) {
    errors.slug = 'Seu identificador único está muito longo!'
  }

  return errors
}

const mapActionsCreators = (dispatch, props) => ({
  ...props,
  submit: values => {
    props.submit(values)
      .then(mobilization => {
        const { mobilization: { slug: slugInitial }, onFinishSubmit } = props
        const { slug: slugResult } = mobilization
        const hasSlugUpdated = slugInitial && slugInitial !== slugResult

        hasSlugUpdated && dispatch(notify(slugUpdatedMessage(props.intl)))
        onFinishSubmit && onFinishSubmit(mobilization)
      })
      .catch(errors => {
        dispatch({ errors, type: 'redux-form/STOP_SUBMIT', form: props.formName })
      })
  }
})

MobilizationBasicsForm.propTypes = {
  intl: intlShape.isRequired
}

export default injectIntl(
  connect(undefined, mapActionsCreators)(MobilizationBasicsForm)
)
