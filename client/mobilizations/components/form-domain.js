import React, { PropTypes } from 'react'
import classnames from 'classnames'
import ServerConfig from '~server/config'
import { FormGroup, ControlLabel, FormControl, FormDropdown } from '~client/components/forms'

const HeaderToggle = ({ children, show, onToggle }) => (
  <h3 onClick={onToggle} style={{ cursor: 'pointer' }}>
    <i
      className={classnames('fa', !show ? 'fa-arrow-right' : 'fa-arrow-down')}
      style={{ marginRight: '5px' }}
    />
    {children}
  </h3>
)

const FormDomain = ({
  formComponent: FormComponent,
  fields: { domain, subdomain, advancedConfig, externalDomain },
  mobilization,
  hostedZones,
  ...formProps
}) => (
  <FormComponent {...formProps}>
    <div className='basic-config' style={{ marginBottom: '1rem' }}>
      <HeaderToggle
        onToggle={() => advancedConfig.onChange(false)}
        show={!advancedConfig.value}
      >
        Opções de domínio
      </HeaderToggle>
      {!advancedConfig.value && (
        <div>
          <p className='h5'>
            Escolha abaixo o subdomínio que deseja para sua mobilização,
            e o domínio principal no qual ele deve viver.
          </p>
          <div className='flex flex-wrap'>
            <FormGroup controlId='subdomain' className='col col-6' {...subdomain}>
              <ControlLabel>Subdomínio</ControlLabel>
              <FormControl
                type='text'
                placeholder='nomedamob'
              />
            </FormGroup>
            <FormGroup controlId='domain' className='col col-6' {...domain}>
              <ControlLabel>Domínio Principal</ControlLabel>
              <FormDropdown>
                {hostedZones.map((hz, i) => (
                  <option key={`hostedZone-${i}`} value={hz.domain_name}>
                    {hz.domain_name}
                  </option>
                ))}
              </FormDropdown>
            </FormGroup>
          </div>
        </div>
      )}
    </div>
    <div className='advanced-config'>
      <HeaderToggle
        onToggle={() => advancedConfig.onChange(true)}
        show={advancedConfig.value}
      >
        Opções avançadas de domínio
      </HeaderToggle>
      {advancedConfig.value && (
        <div>
          <p className='h5'>
            Aqui você pode personalizar o endereço da sua mobilização caso já tenha um domínio próprio.
            Por exemplo, se você já comprou www.nomedoseuprojeto.com.br, você pode usá-lo para este BONDE.
            Demais, né?
          </p>
          <FormGroup controlId='externalDomain' {...externalDomain}>
            <ControlLabel>Domínio personalizado</ControlLabel>
            <FormControl
              type='text'
              placeholder='www.meudominio.com.br'
            />
          </FormGroup>

          <div className='separator' />

          <div className='h5'>
            <p>
              <strong>Não esqueça</strong>: você vai precisar configurar este domínio no servidor de
              registro para que ele redirecione a URL para a página da sua mobilização no BONDE.
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
                  <td><code>{externalDomain ? externalDomain.value : ''}</code></td>
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
        </div>
      )}
    </div>
  </FormComponent>
)

FormDomain.propTypes = {
  formComponent: PropTypes.any.isRequired,
  fields: PropTypes.shape({
    externalDomain: PropTypes.object.isRequired,
    subdomain: PropTypes.object.isRequred,
    domain: PropTypes.object.isRequired
  }).isRequired,
  mobilization: PropTypes.object.isRequired,
  hostedZones: PropTypes.array.isRequired
}

export default FormDomain
