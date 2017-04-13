import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import { Loading } from '~client/components/await'
import { ButtonPreview, DomainPreview, SubdomainPreview } from '~client/community/components/dns'

import * as Paths from '~client/paths'

class Page extends Component {

  constructor (props) {
    super(props)
    this.state = {
      dnsHostedZone: undefined,
      dnsRecords: undefined
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

  render () {

    const { dnsHostedZoneIsLoading, dnsHostedZones, dnsRecordsIsLoading } = this.props

    return dnsHostedZoneIsLoading ? <Loading /> : (
      <div className='domain-page'>
        <div className='dns-hosted-zones'>
          <h2>Domínios da comunidade</h2>
          {dnsHostedZones && dnsHostedZones.map(dnsHostedZone => (
            <DomainPreview
              domain={dnsHostedZone}
              isActive={this.state.dnsHostedZone === dnsHostedZone}
              onClick={() => this.toggleDNSRecords(dnsHostedZone)}
              onDelete={() => console.log('delete domain')}
            />
          ))}
          <ButtonPreview
            text='Adicionar novo domínio'
            onClick={() => browserHistory.push(Paths.communityDomainCreate())}
          />
        </div>
        {dnsRecordsIsLoading ? <Loading /> :
          this.state.dnsHostedZone ? (
            <div className='dns-records'>
              <h2>Subdomínios externos</h2>
              {this.state.dnsRecords.map(dnsRecord => (
                <SubdomainPreview
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
  fetchDNSRecords: PropTypes.func
}

export default Page
