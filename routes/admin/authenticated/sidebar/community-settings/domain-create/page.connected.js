import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import DNSControlSelectors from '~client/community/dns-control-selectors'
import { asyncAddHostedZone, asyncCheckHostedZone } from '~client/community/action-creators/dns-control'
import { isValidDomain } from '~client/utils/validation-helper'

import Page from './page'

const fields = ['domain_name']

const validate = values => {
  const errors = {}
  if (!values.domain_name) {
    errors.domain_name = 'Domínio é obrigatório.'
  } else if (!isValidDomain(values.domain_name)) {
    errors.domain_name = 'Domínio inválido'
  }
  return errors
}

const mapStateToProps = state => ({
  saving: DNSControlSelectors(state).dnsHostedZones().isSaving()
})

const mapActionsToProps = {
  save: asyncAddHostedZone,
  checkHostedZone: asyncCheckHostedZone
}

export default connect(mapStateToProps, mapActionsToProps)(
  reduxForm({ form: 'createDomainForm', fields, validate })(Page)
)
