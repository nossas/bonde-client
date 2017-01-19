import React, { PropTypes, Component } from 'react'
import classnames from 'classnames'
import keycode from 'keycode'

// Global module dependencies
import { Loading } from '../../../../scripts/components'

// Sibling module dependencies
import { selectors as WidgetSelectors } from '../../../../modules/widgets'

// Current module dependencies
import {
  BlockColorPicker,
  BlockWidgets,
  BlockHiddenTag,
  BlockDropdownMenu,
} from '../../../mobilizations/blocks/components'

import { generateClassName, generateStyle } from '../utils'


class Block extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      hasMouseOver: false,
      editingBackground: false,
      editingWidget: false,
      bgClass: props.block.bg_class,
      bgImage: props.block.bg_image,
      uploadProgress: null,
      loading: false
    }
  }

  onChange(state) {
    this.setState({ ...this.state, ...state })
  }

  render() {
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
        <div className="col-10 mx-auto">
          {this.state.editingBackground && (
            <BlockColorPicker
              state={this.state}
              props={this.props}
              onChange={::this.onChange}
            />
          )}
          <div className="clearfix" style={{ padding: '5em 0' }}>
            <BlockWidgets
              state={this.state}
              props={this.props}
              onChange={::this.onChange}
              widgets={WidgetSelectors.getBlockWidgets({ widgets, block })}
            />
          </div>
          <div className="relative">
            {this.props.block.hidden && (
              <BlockHiddenTag />
            )}
          </div>
          {this.state.loading && <Loading />}

          <div className="relative">
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
  widgets: PropTypes.array.isRequired,
  widgetUpdate: PropTypes.func,
  setEditionMode: PropTypes.func
}

export default Block
