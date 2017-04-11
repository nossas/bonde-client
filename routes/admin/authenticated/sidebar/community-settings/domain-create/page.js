import React, { Component } from 'react'
import { FormRedux, ControlLabel, FormControl, FormGroup } from '~client/components/forms'
import { Button } from '~client/ux/components'


class Page extends Component {

  constructor (props) {
    super(props)
    this.state = {
      dns: undefined,
      renderTestConnection: false
    }
  }

  handleTestConnection () {

  }

  render () {

    const { saving, save, fields: { domain_name }, ...formProps } = this.props
    return (
      <div className='page'>
        <h2>Domínio da comunidade</h2>

        <div className='step step-01'>
          <h3>Insira o domínio desejado</h3>
          <FormRedux
            nosubmit
            {...formProps}
            onSubmit={values => {
              return save(values)
                .then(dns => {
                  this.setState({ dns })
                  return Promise.resolve()
                })
            }}
          >
            <FormGroup {...domain_name}>
              <ControlLabel>Domínio da sua comunidade</ControlLabel>
              <FormControl type='text' placeholder='Ex. minhacomunidade.org' />
            </FormGroup>
            <Button disabled={saving} type='submit'>Adicionar</Button>
          </FormRedux>
        </div>

        {this.state.dns && (
          <div className='step step-02'>
            <h3>Altere os servidores do seu provedor DNS</h3>
            <div>
              <p>1. Faça login no seu provedor de DNS (onde seu domínio está registrado, por exemplo GoDaddy, Locaweb, RegistroBR)</p>
              <p>2. Encontre a página de <b>gerenciador de DNS</b>, e altere os <b>nomes de servidor</b> para os servidores do Bonde:</p>
              <br />
              {this.state.dns.delegation_set_servers.map(server => <p>{server}</p>)}
              <Button onClick={() => this.setState({ renderTestConnection: true })}>Continuar</Button>
            </div>
          </div>
        )}

        {this.state.renderTestConnection && (
          <div className='step step-03'>
            <h3>Teste a conexão</h3>
            <div>
              <p>Clique no botão abaixo para verificar se tudo está certo.</p>
              <p>Atenção: a mudança de DNS pode demorar até 48 horas para ser propagada pela internet.</p>
            </div>
            <Button onClick={() => this.handleTestConnection().bind(this)}></Button>
          </div>
        )}
      </div>
    )
  }
}

export default Page
