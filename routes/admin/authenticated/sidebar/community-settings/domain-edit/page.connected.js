import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import DNSControlSelectors from '~client/community/dns-control-selectors'
import { asyncEditHostedZone } from '~client/community/action-creators/dns-control'
import { isValidDomain } from '~client/utils/validation-helper'

import Page from './page'

const fields = ['id', 'domain_name']

const validate = values => {
  const errors = {}
  if (!values.domain_name) {
    errors.domain_name = 'Domínio é obrigatório.'
  } else if (!isValidDomain(values.domain_name)) {
    errors.domain_name = 'Domínio inválido'
  }
  return errors
}

const mapStateToProps = (state, props) => {
  const dns = DNSControlSelectors(state).dnsHostedZones().get(props.params.dns_id)
  return {
    saving: DNSControlSelectors(state).dnsHostedZones().isSaving(state),
    initialValues: {
      ...dns
    }
  }
}

const mapActionsToProps = {
  save: asyncEditHostedZone
}

export default connect(mapStateToProps, mapActionsToProps)(
  reduxForm({ form: 'editDomainForm', fields, validate })(Page)
)
