import React, { PropTypes } from 'react'
import { Link, Navigation } from 'react-router'
import reactMixin from 'react-mixin'
import * as Paths from '../Paths'

@reactMixin.decorate(Navigation)
export default class MobilizationMenu extends React.Component {
  static propTypes = {
    mobilization: PropTypes.object.isRequired
  }

  handleBlankTarget(event) {
    event.preventDefault()
    window.open(this.makeHref(event.currentTarget.getAttribute('href')))
  }

  render() {
    const { mobilization } = this.props
    return (
      <div className='white bg-gray' style={{maxWidth: '280px', minWidth: '280px'}}>
        <div className="flex flex-center p3">
          <div className="flex-auto">
            <Link
              to={Paths.editMobilization(mobilization.id)}
              className="silver h4 bold">
              {mobilization.name}
            </Link>
          </div>
          <Link
            to={Paths.basicsMobilization(mobilization.id)}
            className="silver h3">
            <i className="fa fa-cog" />
          </Link>
        </div>
        <h6 className="px3 silver caps muted">Edição da página</h6>
        <Link
          to={Paths.newMobilizationBlock(mobilization.id)}
          className="silver button-menu button-transparent pl3 full-width">
          <i className="fa fa-plus mr2" />
          Bloco de conteúdo
        </Link>
        <Link
          to={Paths.fontsMobilization(mobilization.id)}
          className="pl3 silver button-menu button-transparent full-width">
          <i className="fa fa-paint-brush mr2" />
          Editar Estilo
        </Link>
        <h6 className="px3 silver caps muted">dados da mobilização</h6>
        <Link
          to={Paths.donationListMobilization(mobilization.id)}
          className="silver button-menu button-transparent pl3 full-width">
          <i className="fa fa-dollar mr2" />
          Doações
        </Link>
        <h6 className="px3 silver caps muted">Visualização da página</h6>
        <a
          href={Paths.mobilization(mobilization)}
          className="silver button-menu button-transparent full-width"
          target="_blank"
          onClick={::this.handleBlankTarget}>
          <i className="fa fa-external-link mr2" />
          Ver em uma nova aba
        </a>
      </div>
    )
  }
}
