import React, { PropTypes } from 'react'
import classnames from 'classnames'

import { DropDownMenu, DropDownMenuItem } from '../../../../scripts/components'
import { actions as BlockActions } from '../../../mobilizations/blocks'

const displayDropDownMenu = ({ state, props }) => (
  state.hasMouseOver &&
  !state.editingBackground &&
  !state.editingWidget &&
  !state.loading &&
  props.editable
)

const BlockDropdownMenu = ({ state, props, onChange }) => {
  const {
    dispatch,
    canMoveUp,
    canMoveDown,
    mobilization,
    block,
    blocks
  } = props

  const {
    asyncBlockUpdate,
    asyncBlockDestroy,
    asyncBlockMoveUp,
    asyncBlockMoveDown
  } = BlockActions

  return (
    <DropDownMenu
      wrapperClassName={classnames(
        'm1 absolute bottom-0 right-0 z2',
        {'display-none': !displayDropDownMenu({ state, props })}
      )}
      menuClassName='bg-darken-4 rounded white right-0 top-0 mr4'
      buttonClassName='btn bg-darken-4 white rounded'
      icon='cog'
    >
      <DropDownMenuItem
        onClick={() => onChange({ editingBackground: true })}
        className='btn'>
        <span>
          <i className='fa fa-picture-o' /> Alterar fundo
        </span>
      </DropDownMenuItem>
      <DropDownMenuItem
        onClick={() => {
          onChange({ loading: true })
          dispatch(asyncBlockUpdate({
            mobilization,
            block: { ...block, hidden: !block.hidden }
          }))
        }}
        className='btn'>
        <span>
          <i className={classnames('fa', (block.hidden ? 'fa-eye' : 'fa-eye-slash'))} />
          {(block.hidden ? ' Mostrar' : ' Esconder')}
        </span>
      </DropDownMenuItem>
      <DropDownMenuItem
        onClick={() => {
          if (confirm('Você tem certeza que quer remover este bloco?')) {
            onChange({ loading: true })
            dispatch(asyncBlockDestroy({ mobilization, block }))
          }
        }}
        className='btn'>
        <span>
          <i className='fa fa-trash' /> Remover
        </span>
      </DropDownMenuItem>
      <DropDownMenuItem
        disabled={!canMoveUp}
        onClick={() => {
          onChange({ loading: true })
          dispatch(asyncBlockMoveUp({ mobilization, block, blocks }))
        }}
        className='btn'>
        <span>
          <i className='fa fa-chevron-up' /> Mover para cima
        </span>
      </DropDownMenuItem>
      <DropDownMenuItem
        disabled={!canMoveDown}
        onClick={() => {
          onChange({ loading: true })
          dispatch(asyncBlockMoveDown({ mobilization, block, blocks }))
        }}
        className='btn'>
        <span>
          <i className='fa fa-chevron-down' /> Mover para baixo
        </span>
      </DropDownMenuItem>
    </DropDownMenu>
  )
}

BlockDropdownMenu.propTypes = {
  state: PropTypes.shape({
    hasMouseOver: PropTypes.bool,
    editingBackground: PropTypes.bool,
    editingWidget: PropTypes.bool,
    loading: PropTypes.bool
  }),
  props: PropTypes.shape({
    editable: PropTypes.bool,
    dispatch: PropTypes.func,
    canMoveUp: PropTypes.bool,
    canMoveDown: PropTypes.bool,
    mobilization: PropTypes.object,
    blocks: PropTypes.array,
    block: PropTypes.shape({
      hidden: PropTypes.bool
    })
  }),
  onChange: PropTypes.func
}

export default BlockDropdownMenu
