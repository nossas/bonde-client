import React, { PropTypes, Component } from 'react'

import './technical-issues.scss'
import logoIcon from '../../../.old/app/components/Navigation/Sidenav/logo-icon.svg'

class TechnicalIssues extends Component {
  render() {
    return (
      <div className="errors-technical-issues lg-col-6">
        <div className="container">
          <div className="logo-icon" />
          <div className="scrollable">
            <h1 className="darkblue">OLÁ :)</h1>
            <article>
              Parece que estamos tendo problemas técnicos na página
              que você está procurando, mas pode ter certeza de que
              estamos dando nosso máximo para resolver.
            </article>
            <p className="contact link">
              <span className="bold darkblue">Você pode tentar novamente daqui a pouco?</span><br />
              Qualquer dúvida, pode falar com a gente<br />
              pelo e-mail: <a href="mailto:contato@nossas.org?Subject=Problemas%20Técnicos" target="_blank">contato@nossas.org</a>
            </p>
            <footer className="link">
              A página que vocês está procurando foi criada usando uma ferramenta do Nossas - organização
                ativista por natureza que trabalhar pra armar e articular a potência pra reinventar e reconstruir
                a política, todos os dias. <a href="http://nossas.org" target="_blank">Conheça nosso trabalho</a>.
            </footer>
          </div>
        </div>
      </div>
    )
  }
}

export default TechnicalIssues
