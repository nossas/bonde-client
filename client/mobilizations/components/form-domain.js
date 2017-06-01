import PropTypes from 'prop-types'
import React, { Component } from 'react'
import classnames from 'classnames'
import ServerConfig from '~server/config'
import { FormGroup, ControlLabel, FormControl, FormDropdown } from '~client/components/forms'
import { isBoolean } from '~client/utils/type-checker'

if (require('exenv').canUseDOM) require('./form-domain.scss')

const HeaderToggle = ({ children, show, onToggle }) => (
  <h3 onClick={onToggle} style={{ cursor: 'pointer' }}>
    <i
      className={classnames('fa', !show ? 'fa-arrow-right' : 'fa-arrow-down')}
      style={{ marginRight: '5px' }}
    />
    {children}
  </h3>
)

const CreateDomainText = ({ onClickLink }) => (
  <p className='h5'>
    Ops, você ainda não tem um domínio configurado na sua comunidade. Se quiser
    cadastar, <a href='#' onClick={onClickLink} target='_self'>clique aqui</a>.
    <br />
    Senão você pode, abaixo, usar um domínio externo para configurar o endereço
    da sua mobilização.
  </p>
)

class FormDomain extends Component {
  constructor (props) {
    super(props)

    this.state = {
      showSubdomain: false,
      showExternalDomain: false,
      showRootDomain: false
    }
  }

  componentDidMount () {
    const { hostedZones, mobilization: { custom_domain: customDomain } } = this.props

    /* eslint-disable no-useless-escape */
    const subdomainRegex = zone => new RegExp(`^www\..+\.${zone.domain_name}$`).test(customDomain)
    const rootDomainRegex = zone => new RegExp(`^www\.${zone.domain_name}$`).test(customDomain)
    /* eslint-disable no-useless-escape */

    const hasCustomDomain = !!customDomain
    const isSubdomain = hostedZones.some(subdomainRegex)
    const isRootDomain = hostedZones.some(rootDomainRegex)

    if (!hasCustomDomain || isSubdomain) {
      this.toggle('showSubdomain', !this.state.showSubdomain)
    } else if (hasCustomDomain && !isSubdomain && !isRootDomain) {
      this.toggle('showExternalDomain', !this.state.showExternalDomain)
    } else if (isRootDomain) {
      this.toggle('showRootDomain', !this.state.showRootDomain)
    }
  }

  clickHere (e) {
    e.preventDefault()
    this.props.redirectToCreateDNS()
  }

  toggle (key, value) {
    if (key === 'showExternalDomain') {
      this.props.fields.advancedConfig.onChange(value)
      const state = { [key]: value }
      if (value === true) {
        state.showSubdomain = false
        state.showRootDomain = false
        this.props.fields.rootDomainConfig.onChange(false)
      }
      this.setState(state)
    } else if (key === 'showSubdomain') {
      const state = { [key]: value }
      if (value === true) {
        state.showExternalDomain = false
        state.showRootDomain = false
        this.props.fields.advancedConfig.onChange(false)
        this.props.fields.rootDomainConfig.onChange(false)
      }
      this.setState(state)
    } else if (key === 'showRootDomain') {
      this.props.fields.rootDomainConfig.onChange(value)
      const state = { [key]: value }
      if (value === true) {
        state.showSubdomain = false
        state.showExternalDomain = false
        this.props.fields.advancedConfig.onChange(false)
      }
      this.setState(state)
    }
  }

  renderCNAMETable () {
    const { mobilization, fields: { externalDomain } } = this.props
    let host = externalDomain ? externalDomain.value : ''
    if (host.startsWith('www.')) {
      host = host.replace('www.', '')
    }
    return (
      <div className='h5'>
        <p>
          <strong>Não esqueça</strong>: você vai precisar configurar este domínio no seu
          servidor de registro para que o endereço seja redirecionado à página da sua mobilização.
          Pra isso, você vai precisar dessas informações aqui embaixo, anote aí:
        </p>
        <table className='col-12 left-align'>
          <tbody>
            <tr>
              <th>Nome</th>
              <th>Tipo</th>
              <th>Dados</th>
            </tr>
            <tr>
              <td><code>{host}</code></td>
              <td><code>CNAME</code></td>
              <td><code>{mobilization.slug}.{ServerConfig.appDomain}</code></td>
            </tr>
            <tr>
              <td><code>{`www.${host}`}</code></td>
              <td><code>CNAME</code></td>
              <td><code>{mobilization.slug}.{ServerConfig.appDomain}</code></td>
            </tr>
          </tbody>
        </table>
        <p>
          Se tiver alguma dúvida, dá uma olhada no tópico "Configurando seu domínio no BONDE",
          no nosso tutorial, o <a href='https://trilho.bonde.org' target='_blank'>
            Trilho <i className='fa fa-external-link' style={{ fontSize: '.7rem' }} />
          </a>.
        </p>
      </div>
    )
  }

  render () {
    const {
      formComponent: FormComponent,
      fields: { domain, subdomain, externalDomain, rootDomain },
      hostedZones,
      ...formProps
    } = this.props

    return (
      <div className='components--form-domain'>
        <FormComponent {...formProps}>
          <div className='basic-config' style={{ marginBottom: '1rem' }}>
            <HeaderToggle
              onToggle={() => this.toggle('showSubdomain', !this.state.showSubdomain)}
              show={this.state.showSubdomain}
            >
              Quero usar um novo sub-domínio
            </HeaderToggle>
            {this.state.showSubdomain && (
              hostedZones.length > 0 ? (
                <div>
                  <p className='h5'>
                    Preencha abaixo o subdomínio e escolha o domínio que deseja
                    configurar como endereço da sua mobilização
                  </p>
                  <div className='form-groups-container flex flex-wrap'>
                    <div className='prefix'>www.</div>
                    <FormGroup controlId='subdomain' {...subdomain}>
                      <ControlLabel>Subdomínio</ControlLabel>
                      <FormControl
                        type='text'
                        placeholder='nomedamob'
                      />
                    </FormGroup>
                    <div className='delimiter'>
                      <strong>.</strong>
                    </div>
                    <FormGroup controlId='domain' {...domain}>
                      <ControlLabel>Domínio Principal</ControlLabel>
                      <FormDropdown
                        onChange={e => domain.onChange(e.target.value)}
                        value={
                          (isBoolean(domain.value) ? false : domain.value) ||
                          domain.initialValue || ''
                        }
                      >
                        <option value='' disabled>Escolha...</option>
                        {hostedZones.map((obj, i) => (
                          <option key={`hostedZone-${i}`} value={obj.domain_name}>
                            {obj.domain_name}
                          </option>
                        ))}
                      </FormDropdown>
                    </FormGroup>
                  </div>
                </div>
              ) : (
                <div>
                  <CreateDomainText
                    onClickLink={this.clickHere.bind(this)}
                  />
                </div>
              )
            )}
          </div>

          <div className='root-domain-config basic-config' style={{ marginBottom: '1rem' }}>
            <HeaderToggle
              onToggle={() => this.toggle('showRootDomain', !this.state.showRootDomain)}
              show={this.state.showRootDomain}
            >
              Quero usar um domínio principal cadastrado na comunidade
            </HeaderToggle>
            {this.state.showRootDomain && (
              hostedZones.length > 0 ? (
                <div>
                  <p className='h5'>
                    Escolha o domínio que deseja configurar como endereço da sua mobilização
                  </p>
                  <div className='form-groups-container flex flex-wrap'>
                    <div className='prefix'>www.</div>
                    <FormGroup controlId='rootDomain' {...rootDomain}>
                      <ControlLabel>Domínio Principal</ControlLabel>
                      <FormDropdown
                        onChange={e => rootDomain.onChange(e.target.value)}
                        value={
                          (isBoolean(rootDomain.value) ? false : rootDomain.value) ||
                          rootDomain.initialValue || ''
                        }
                      >
                        <option value='' disabled>Escolha...</option>
                        {hostedZones.map((obj, i) => (
                          <option
                            key={`hostedZone-${i}`}
                            value={obj.domain_name}
                          >
                            {obj.domain_name}
                          </option>
                        ))}
                      </FormDropdown>
                    </FormGroup>
                  </div>
                </div>
              ) : (
                <div>
                  <CreateDomainText
                    onClickLink={this.clickHere.bind(this)}
                  />
                </div>
              )
            )}
          </div>

          <div className='advanced-config'>
            <HeaderToggle
              onToggle={() => this.toggle('showExternalDomain', !this.state.showExternalDomain)}
              show={this.state.showExternalDomain}
            >
              Quero direcionar para um domínio externo
            </HeaderToggle>

            {this.state.showExternalDomain && (
              <div>
                <p className='h5'>
                  Se você quer usar um domínio que comprou mas não está cadastrado na sua comunidade
                  aqui, pode fazer isso. Por exemplo, se você já comprou www.meudominio.com.br você
                  pode usá-lo para este BONDE. Demais, né? Preencha o campo abaixo e siga as orientações:
                </p>
                <FormGroup controlId='externalDomain' {...externalDomain}>
                  <ControlLabel>Domínio personalizado</ControlLabel>
                  <div className='form-control-container--external-domain'>
                    <div className='prefix'>www.</div>
                    <FormControl
                      containerClassName='form-control--external-domain'
                      type='text'
                      placeholder='meudominio.com.br'
                    />
                  </div>
                </FormGroup>

                <div className='separator' />

                {this.renderCNAMETable()}
              </div>
            )}
          </div>
        </FormComponent>
      </div>
    )
  }
}

FormDomain.propTypes = {
  formComponent: PropTypes.any.isRequired,
  fields: PropTypes.shape({
    externalDomain: PropTypes.object.isRequired,
    subdomain: PropTypes.object.isRequred,
    domain: PropTypes.object.isRequired
  }).isRequired,
  mobilization: PropTypes.object.isRequired,
  hostedZones: PropTypes.array.isRequired,
  redirectToCreateDNS: PropTypes.func,
  isSubdomain: PropTypes.bool
}

export default FormDomain
