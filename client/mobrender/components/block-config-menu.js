import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'
import { DropdownMenu, DropdownMenuItem } from '~client/components/dropdown-menu'

export const EDIT_KEY = 'background'

const BlockConfigMenu = ({ block, update, destroy, onEdit, canMoveUp, moveUp, canMoveDown, moveDown, display }) => (
  <DropdownMenu
    wrapperClassName={classnames(
      'm1 absolute bottom-0 right-0 z2',
      {'display-none': !display}
    )}
    menuClassName='bg-darken-4 rounded white right-0 top-0 mr4'
    buttonClassName='btn bg-darken-4 white rounded'
    icon='cog'
  >
    <DropdownMenuItem
      className='btn'
      onClick={() => onEdit(`${EDIT_KEY}-${block.id}`)}
    >
      <span>
        <i className='fa fa-picture-o' /> Alterar fundo
      </span>
    </DropdownMenuItem>
    <DropdownMenuItem
      className='btn'
      onClick={() => update({...block, hidden: !block.hidden})}
    >
      <span>
        <i className={classnames('fa', block.hidden ? 'fa-eye' : 'fa-eye-slash')} /> {(block.hidden ? 'Mostrar' : 'Esconder')}
      </span>
    </DropdownMenuItem>
    <DropdownMenuItem
      className='btn'
      onClick={() => {
        if (window.confirm('Você tem certeza que quer remover este bloco?')) {
          destroy(block)
        }
      }}
    >
      <span>
        <i className='fa fa-trash' /> Remover
      </span>
    </DropdownMenuItem>
    <DropdownMenuItem
      className='btn'
      disabled={!canMoveUp}
      onClick={() => moveUp(block)}
    >
      <span>
        <i className='fa fa-chevron-up' /> Mover para cima
      </span>
    </DropdownMenuItem>
    <DropdownMenuItem
      className='btn'
      disabled={!canMoveDown}
      onClick={() => moveDown(block)}
    >
      <span>
        <i className='fa fa-chevron-down' /> Mover para baixo
      </span>
    </DropdownMenuItem>
  </DropdownMenu>
)

BlockConfigMenu.propTypes = {
  block: PropTypes.object.isRequired,
  display: PropTypes.bool,
  // Injected by redux
  canMoveUp: PropTypes.bool,
  moveUp: PropTypes.func,
  canMoveDown: PropTypes.bool,
  moveDown: PropTypes.func,
  update: PropTypes.func,
  onEdit: PropTypes.func
}

export default BlockConfigMenu
