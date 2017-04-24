import React from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import { asyncUpdateMobilization } from '~client/mobrender/redux/action-creators'
import { isValidDomain } from '~client/utils/validation-helper'
import FormDomain from './form-domain'

const fields = ['advancedConfig', 'domain', 'subdomain', 'externalDomain']

export const validate = (values, props) => {
  const errors = {}

  if (props.requiredField) {

    if (values.advancedConfig === true && !values.externalDomain) {
      errors.externalDomain = 'Obrigatório'
    }
    if (!values.advancedConfig && !values.subdomain) {
      errors.subdomain = 'Obrigatório'
    }
    if (!values.advancedConfig && !values.domain) {
      errors.domain = 'Obrigatório'
    }
  }

  if (values.externalDomain && !isValidDomain(values.externalDomain)) {
    errors.externalDomain = 'Informe um domínio válido'
  }

  return errors
}

const mapStateToProps = (state, props) => {
  const { custom_domain: customDomain } = props.mobilization
  if (customDomain) {
    const domain = customDomain.replace(/^[\w\-]+\./, '')
    const subdomain = customDomain.replace(`.${domain}`, '')

    if (props.hostedZones.filter(hosted => hosted.domain_name === domain)[0]) {
      return {
        initialValues: { domain, subdomain }
      }
    }
    return {
      initialValues: { externalDomain: customDomain, advancedConfig: true }
    }
  }
  return {
    initialValues: {
      domain: props.hostedZones.length > 0 ? props.hostedZones[0].domain_name : undefined
    }
  }
}

const mapActionsToProps = (dispatch, props) => ({
  ...props,
  submit: ({ advancedConfig, domain, subdomain, externalDomain }) => {
    const mobilization = { ...props.mobilization, custom_domain: null }
    if (advancedConfig && externalDomain) {
      mobilization.custom_domain = externalDomain
    } else if (!advancedConfig && subdomain) {
      mobilization.custom_domain = `${subdomain}.${domain}`
    }
    return dispatch(asyncUpdateMobilization(mobilization))
  }
})

export default connect(mapStateToProps, mapActionsToProps)(
  reduxForm({ form: 'formDomain', fields, validate })(FormDomain)
)
