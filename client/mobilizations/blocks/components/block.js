import React, { PropTypes, Component } from 'react'
import classnames from 'classnames'
import keycode from 'keycode'

// Sibling module dependencies
import * as WidgetSelectors from '~mobilizations/widgets/selectors'

// Current module dependencies
import {
  BlockColorPicker,
  BlockWidgets,
  BlockHiddenTag,
  BlockDropdownMenu
} from '../components'

import { generateClassName, generateStyle } from '../utils'

class Block extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      hasMouseOver: false,
      editingBackground: false,
      editingWidget: false,
      bgClass: props.block.bg_class,
      bgImage: props.block.bg_image,
      uploadProgress: null
    }
  }

  onChange (state) {
    this.setState({ ...this.state, ...state })
  }

  render () {
    const { widgets, block } = this.props

    return (
      <div
        id={`block-${block.id}`}
        style={{ ...generateStyle(block) }}
        className={classnames('clearfix', generateClassName(block))}
        onMouseOver={() => ::this.onChange({ hasMouseOver: true })}
        onMouseOut={() => ::this.onChange({ hasMouseOver: false })}
        onKeyUp={event => {
          if (keycode(event.keyCode) === 'esc') {
            ::this.onChange({ editingBackground: false })
          }
        }}
      >
        <div className='col-10 mx-auto'>
          {this.state.editingBackground && (
            <BlockColorPicker
              state={this.state}
              props={this.props}
              onChange={::this.onChange}
            />
          )}
          <div className='clearfix' style={{ padding: '5em 0' }}>
            <BlockWidgets
              state={this.state}
              props={this.props}
              onChange={::this.onChange}
              widgets={WidgetSelectors.getBlockWidgets({ widgets, block })}
            />
          </div>
          <div className='relative'>
            {this.props.block.hidden && (
              <BlockHiddenTag />
            )}
          </div>

          <div className='relative'>
            <BlockDropdownMenu
              state={this.state}
              props={this.props}
              onChange={::this.onChange}
            />
          </div>
        </div>
      </div>
    )
  }
}

Block.propTypes = {
  block: PropTypes.object.isRequired,
  blockIsRequest: PropTypes.bool,
  widgets: PropTypes.array.isRequired,
  widgetUpdate: PropTypes.func,
  setEditionMode: PropTypes.func
}

export default Block
