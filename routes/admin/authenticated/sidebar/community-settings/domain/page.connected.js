import { provideHooks } from 'redial'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import DNSControlSelectors from '~client/community/dns-control-selectors'
import {
  asyncFetchHostedZones,
  asyncFetchDNSRecords,
  asyncDeleteHostedZone,
  asyncAddDNSRecord,
  asyncDeleteDNSRecord,
  asyncCheckHostedZone
} from '~client/community/action-creators/dns-control'

import Page from './page'

const fields = ['name', 'record_type', 'value']

const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Preenchimento obrigatório'
  }
  if (!values.record_type) {
    errors.record_type = 'Preenchimento obrigatório'
  }
  if (!values.value) {
    errors.value = 'Preenchimento obrigatório'
  }
}

const redial = {
  fetch: ({ dispatch, getState }) => {
    const state = getState()
    const promises = []
    const selectors = DNSControlSelectors(state)
    !selectors.dnsHostedZones().isLoaded() && promises.push(
      dispatch(asyncFetchHostedZones())
    )
    return Promise.all(promises)
  }
}

const mapStateToProps = (state, props) => {
  const selectors = DNSControlSelectors(state)

  const dnsHostedZoneIsLoading = (
    selectors.dnsHostedZones().isLoading() ||
    selectors.dnsHostedZones().isSaving()
  )

  const dnsRecordsIsLoading = (
    selectors.dnsRecords().isLoading() ||
    selectors.dnsRecords().isSaving()
  )

  return {
    dnsHostedZoneIsLoading,
    dnsRecordsIsLoading,
    dnsHostedZones: selectors.dnsHostedZones().getList()
  }
}

const mapActionsToProps = {
  fetchDNSRecords: asyncFetchDNSRecords,
  deleteHostedZone: asyncDeleteHostedZone,
  createDNSRecord: asyncAddDNSRecord,
  deleteDNSRecord: asyncDeleteDNSRecord,
  checkHostedZone: asyncCheckHostedZone
}

export default provideHooks(redial)(
  reduxForm({ form: 'createDNSRecordForm', fields, validate })(
    connect(mapStateToProps, mapActionsToProps)(Page)
  )
)
