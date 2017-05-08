import React, { Component } from 'react'
import { StepsContainer, StepContent, StepForm, StepButton } from '~client/components/steps'
import { ControlLabel, FormControl, FormGroup } from '~client/components/forms'
import { Button } from '~client/ux/components'

class Page extends Component {

  constructor (props) {
    super(props)
    this.state = { isConnected: false }
  }

  handleConnectionTest () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.setState({ isConnected: true })
        resolve()
      }, 1000)
    })
  }

  render () {
    const { fields: { domain }, ...formProps } = this.props

    return (
      <div className='page'>
        <StepsContainer title='Domínio da comunidade'>
          <StepContent title='Insira o domínio desejado'>
            <StepForm
              {...formProps}
              onSubmit={values => new Promise((resolve, reject) => {
                console.log(values)
                return resolve()
              })}
            >
              <FormGroup {...domain}>
                <ControlLabel>Domínio da sua comunidade</ControlLabel>
                <FormControl type='text' placeholder='Ex. minhacomunidade.org' />
              </FormGroup>
              <Button type='submit'>Adicionar</Button>
            </StepForm>
          </StepContent>
          <StepContent title='Altere os servidores no seu provedor DNS'>
            <div>
              <p>1. Faça login no seu provedor de DNS (onde seu domínio está registrado, por exemplo GoDaddy, Locaweb, RegistroBR)</p>
              <p>2. Encontre a página de <b>gerenciador de DNS</b>, e altere os <b>nomes de servidor</b> para os servidores do Bonde:</p>
              <br />
              <p>ns1.1098.19872.0871.98</p>
              <p>ns2.1098.19872.0871.98</p>
              <p>ns3.1098.19872.0871.98</p>
            </div>
            <StepButton>Continuar</StepButton>
          </StepContent>
          <StepContent title='Teste a conexão'>
            <div>
              <p>Clique no botão abaixo para verificar se tudo está certo.</p>
              <p>Atenção: a mudança de DNS pode demorar até 48 horas para ser propagada pela internet.</p>
            </div>
            <StepButton onClick={() => this.handleConnectionTest()}>
              {!this.state.isConnected ? 'Testar' : 'Pronto'}
            </StepButton>
          </StepContent>
        </StepsContainer>
      </div>
    )
  }
}

export default Page
