import React, { Component, PropTypes } from 'react'
import { Loading } from '~client/components/await'
import { RedirectComponent } from '~client/components/redirect'
import { ButtonPreview, DomainPreview } from '~client/community/components/dns'

import * as Paths from '~client/paths'

// Page.js

class Page extends Component {

  handleEditDomain (domain) {
    console.log('Redirect to edit domain', domain)
  }

  handleClickSubdomain (data) {
    if (data) {
      console.log('Redirect to edit subdomain', data)
    } else {
      console.log('Redirect to add subdomain')
    }
  }

  render () {

    const { loading, domain_list } = this.props

    return loading ? <Loading /> : (
      <div className='domain-page'>
        <div className='domain-section'>
          <h2>Domínio da comunidade</h2>
          {domain_list && domain_list.map(data => (
            <RedirectComponent onClick={() => this.handleEditDomain(data)}>
              <DomainPreview domain={data} />
            </RedirectComponent>
          ))}
          <RedirectComponent path={Paths.communityDomainCreate()}>
            <ButtonPreview text='Adicionar domínio principal (ex. minhacomunidade.org)' />
          </RedirectComponent>
        </div>
        <div className='subdomain-section'>
          <h2>Subdomínios externos</h2>
          <RedirectComponent onClick={this.handleClickSubdomain.bind(this)}>
            <ButtonPreview text='Adicionar subdomínios externos' />
          </RedirectComponent>
        </div>
      </div>
    )
  }
}

Page.propTypes = {
  domain_list: PropTypes.array,
}

export default Page
