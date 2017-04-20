import React from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import { asyncUpdateMobilization } from '~client/mobrender/redux/action-creators'
import { isValidDomain } from '~client/utils/validation-helper'
import FormDomain from './form-domain'

const form = 'mobilizationDomainForm'

const fields = ['id', 'custom_domain']

export const validate = values => {
  const errors = {}
  if (values.custom_domain && !isValidDomain(values.custom_domain)) {
    errors.custom_domain = 'Informe um domínio válido'
  }
  return errors
}

const mapStateToProps = (state, props) => ({
  initialValues: {
    ...props.mobilization
  }
})

const mapActionsToProps = { submit: asyncUpdateMobilization }

export default connect(mapStateToProps, mapActionsToProps)(
  reduxForm({ form, fields, validate })(FormDomain)
)
