import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

import { DropDownMenu, DropDownMenuItem } from '../../components'
import BlockWidgets from '../components/BlockWidgets'

class BlockContainer extends Component {

  constructor(props) {
    super(props)

    this.state = { displayMenu: false }
  }

  render() {
    const { block, widgets, editable } = this.props
    // TODO: Criar o comportamento para block move
    const canMoveUp = false
    const canMoveDown = false
    return (
      <div
        id={'block-' + block.id}
        className={classnames('clearfix', block.bg_class, (block.bg_image ? 'bg-cover' : null))}
        style={(block.bg_image ? {backgroundImage: `url(${block.bg_image})`} : null)}>
        <div className="container">
          {/* Render Widgets */}
          <BlockWidgets widgets={this.props.widgets} />
          {/* Block Menu */}
          {editable ?
            <div className='relative'>
              <DropDownMenu
                wrapperClassName={classnames(
                  'm1 absolute bottom-0 right-0 z2',
                  {'display-none': !this.state.displayMenu}
                )}
                menuClassName='bg-darken-4 rounded white right-0 top-0 mr4'
                buttonClassName='button bg-darken-4 white'
                icon="cog"
              >
                {/* Change background */}
                <DropDownMenuItem className="button button-transparent">
                  <span>
                    <i className="fa fa-picture-o" /> Alterar fundo
                  </span>
                </DropDownMenuItem>
                {/* Toggle block  */}
                <DropDownMenuItem className="button button-transparent">
                  <span>
                    <i className={classnames('fa', (block.hidden ? 'fa-eye' : 'fa-eye-slash'))} />
                    {(block.hidden ? ' Mostrar' : ' Esconder')}
                  </span>
                </DropDownMenuItem>
                <DropDownMenuItem className="button button-transparent">
                  <span>
                    <i className="fa fa-trash" /> Remover
                  </span>
                </DropDownMenuItem>
                <DropDownMenuItem
                  disabled={!canMoveUp}
                  className="button button-transparent">
                  <span>
                    <i className="fa fa-chevron-up" /> Mover para cima
                  </span>
                </DropDownMenuItem>
                <DropDownMenuItem
                  disabled={!canMoveDown}
                  className="button button-transparent">
                  <span>
                    <i className="fa fa-chevron-down" /> Mover para baixo
                  </span>
                </DropDownMenuItem>
              </DropDownMenu>
            </div> : null}
          {/* End Block Menu */}
        </div>
      </div>
    )
  }
}

BlockContainer.propTypes = {
  block: PropTypes.shape({
    id: PropTypes.number.isRequired,
    bg_class: PropTypes.string.isRequired,
    bg_image: PropTypes.string,
    hidden: PropTypes.bool,
    position: PropTypes.number
  }).isRequired,
  widgets: PropTypes.array.isRequired,
  editable: PropTypes.bool.isRequired
}

export default BlockContainer
