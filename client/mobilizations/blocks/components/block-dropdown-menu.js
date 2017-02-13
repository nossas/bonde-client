import React, { PropTypes } from 'react'
import classnames from 'classnames'

// Global module dependencies
import { DropdownMenu, DropdownMenuItem } from '~components/dropdown-menu'

const BlockDropdownMenu = ({ state, props, onChange }) => {
  const {
    canMoveUp,
    canMoveDown,
    mobilization,
    block,
    blocks
  } = props

  return (
    <DropdownMenu
      wrapperClassName={classnames(
        'm1 absolute bottom-0 right-0 z2',
        {'display-none': !(
          state.hasMouseOver &&
          !state.editingBackground &&
          !state.editingWidget &&
          !props.blockIsRequest &&
          props.editable
        )}
      )}
      menuClassName='bg-darken-4 rounded white right-0 top-0 mr4'
      buttonClassName='btn bg-darken-4 white rounded'
      icon='cog'
    >
      <DropdownMenuItem
        onClick={() => {
          onChange({ editingBackground: true })
          props.setEditionMode(true)
        }}
        className='btn'
      >
        <span>
          <i className='fa fa-picture-o' /> Alterar fundo
        </span>
      </DropdownMenuItem>
      <DropdownMenuItem
        onClick={() => {
          // onChange({ loading: true })
          props.blockUpdate({
            mobilization,
            block: { ...block, hidden: !block.hidden }
          })
        }}
        className='btn'>
        <span>
          <i className={classnames('fa', (block.hidden ? 'fa-eye' : 'fa-eye-slash'))} />
          {(block.hidden ? ' Mostrar' : ' Esconder')}
        </span>
      </DropdownMenuItem>
      <DropdownMenuItem
        onClick={() => {
          if (window.confirm('Você tem certeza que quer remover este bloco?')) {
            // onChange({ loading: true })
            props.blockDestroy({ mobilization, block })
          }
        }}
        className='btn'>
        <span>
          <i className='fa fa-trash' /> Remover
        </span>
      </DropdownMenuItem>
      <DropdownMenuItem
        disabled={!canMoveUp}
        onClick={() => {
          // onChange({ loading: true })
          props.blockMove('up', { mobilization, block, blocks })
        }}
        className='btn'>
        <span>
          <i className='fa fa-chevron-up' /> Mover para cima
        </span>
      </DropdownMenuItem>
      <DropdownMenuItem
        disabled={!canMoveDown}
        onClick={() => {
          // onChange({ loading: true })
          props.blockMove('down', { mobilization, block, blocks })
        }}
        className='btn'>
        <span>
          <i className='fa fa-chevron-down' /> Mover para baixo
        </span>
      </DropdownMenuItem>
    </DropdownMenu>
  )
}

BlockDropdownMenu.propTypes = {
  state: PropTypes.shape({
    hasMouseOver: PropTypes.bool,
    editingBackground: PropTypes.bool,
    editingWidget: PropTypes.bool
  }),
  props: PropTypes.shape({
    editable: PropTypes.bool,
    dispatch: PropTypes.func,
    canMoveUp: PropTypes.bool,
    canMoveDown: PropTypes.bool,
    mobilization: PropTypes.object,
    blocks: PropTypes.array,
    blockIsRequest: PropTypes.bool,
    block: PropTypes.shape({
      hidden: PropTypes.bool
    })
  }),
  onChange: PropTypes.func
}

export default BlockDropdownMenu
