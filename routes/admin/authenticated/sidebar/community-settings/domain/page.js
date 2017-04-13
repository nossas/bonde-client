import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import { Loading } from '~client/components/await'
import { Dialog } from '~client/ux/components'
import { ButtonPreview, DomainPreview, SubdomainPreview } from '~client/community/components/dns'

import * as Paths from '~client/paths'

class Page extends Component {

  constructor (props) {
    super(props)
    this.state = {
      dnsHostedZone: undefined,
      dnsRecords: undefined,
      deleteHostedZone: undefined,
      deleteDNSRecord: undefined
    }
  }

  toggleDNSRecords (dnsHostedZone) {
    if (dnsHostedZone !== this.state.dnsHostedZone) {
      this.props.fetchDNSRecords(dnsHostedZone)
        .then(dnsRecords => {
          this.setState({ dnsHostedZone, dnsRecords })
        })
    } else {
      this.setState({ dnsHostedZone: undefined, dnsRecords: undefined })
    }
  }

  confirmDeleteDomain () {
    const { deleteHostedZone } = this.props
    if (deleteHostedZone && this.state.deleteHostedZone) {
      this.setState({ deleteHostedZone: undefined })
      deleteHostedZone(this.state.deleteHostedZone)
    }
  }

  render () {

    const { dnsHostedZoneIsLoading, dnsHostedZones, dnsRecordsIsLoading } = this.props

    return (
      <div className='domain-page'>
        <div className='dns-hosted-zones'>
          <h2>Domínios da comunidade</h2>
          {dnsHostedZoneIsLoading && <Loading />}
          {dnsHostedZones && dnsHostedZones.map((dnsHostedZone, index) => (
            <DomainPreview
              key={`dns-hosted-zone-${index}`}
              domain={dnsHostedZone}
              isActive={this.state.dnsHostedZone === dnsHostedZone}
              onClick={() => this.toggleDNSRecords(dnsHostedZone)}
              onDelete={() => this.setState({ deleteHostedZone: dnsHostedZone })}
            />
          ))}
          <ButtonPreview
            text='Adicionar novo domínio'
            onClick={() => browserHistory.push(Paths.communityDomainCreate())}
          />
          {this.state.deleteHostedZone && (
            <Dialog
              onConfirm={() => this.confirmDeleteDomain()}
              onCancel={() => this.setState({ deleteHostedZone: undefined })}
            >
              <p>Tem certeza que deseja remover o domínio <b>{this.state.deleteHostedZone.domain_name}</b>?</p>
            </Dialog>
          )}
        </div>
        {dnsRecordsIsLoading ? <Loading /> :
          this.state.dnsHostedZone ? (
            <div className='dns-records'>
              <h2>Subdomínios externos</h2>
              {this.state.dnsRecords.map((dnsRecord, index) => (
                <SubdomainPreview
                  key={`dns-record-${index}`}
                  subdomain={dnsRecord}
                  onDelete={() => console.log('delete subdomain')}
                />
              ))}
              <ButtonPreview text='Adicionar novo subdomínio externo' />
            </div>
          ) : null
        }
      </div>
    )
  }
}

Page.propTypes = {
  dnsHostedZoneIsLoading: PropTypes.bool,
  dnsRecordsIsLoading: PropTypes.bool,
  dnsHostedZones: PropTypes.array,
  fetchDNSRecords: PropTypes.func,
  deleteHostedZone: PropTypes.func
}

export default Page
