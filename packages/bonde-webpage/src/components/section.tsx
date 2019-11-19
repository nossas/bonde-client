import React from 'react'
import * as PropTypes from 'prop-types'
import WidgetArea from './widget-area'

const getBackgroundStyle = (block: any) => {
  if (block.bg_image) return { background: `url('${block.bg_image}') no-repeat`, backgroundSize: 'cover' }
  else if (block.bg_class) {
    try {
      const rgba = JSON.parse(block.bg_class)
      return {
        backgroundColor: `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`
      }
    } catch (ex) {
      // Silent error because use className
      return {}
    }
  }
  return {}
}

/**
 * The basic rendering structure of a block has features
 * such as navigating between blocks, and events such as
 * mouseEnter and mouseOut.
 */
class Section extends React.Component<{ anchor: any, widgets: any, widgetComponent: any, extraWidgetProps: any, block: any, editable: any, wrapper: any }> {

  propTypes = {
    /* Define anchor to navigate between blocks, this value must
     * be unique per block. */
    anchor: PropTypes.string.isRequired,
    /* This component renders wrapped to the block, in it you can
     * customize the rendering of your block, get block and editable
     * as property. */
    blockWrapper: PropTypes.any,
    /* Data structure of block, passed to blockWrapper component */
    block: PropTypes.object.isRequired,
    /* True if mobilization is editable mode */
    editable: PropTypes.bool.isRequired,
    /* Array of widgets related on Section */
    widgets: PropTypes.array,
    /* Component responsible to render a widget logic,
     * receive { widget } props */
    widgetComponent: PropTypes.any.isRequired,
    // TODO: documentation
    extraWidgetProps: PropTypes.object
  }

  renderBlock() {
    const { anchor, block, widgets, widgetComponent, extraWidgetProps } = this.props
    return (
      <div
        id={anchor}
        className={block.bg_class && block.bg_class.indexOf('{') === -1 ? block.bg_class : undefined}
        style={{ ...getBackgroundStyle(block) }}
      >
        <div className='col-10 mx-auto'>
          <div className='clearfix widgets' style={{ padding: '5em 0' }}>
            {widgets && widgets.map((widget: any) => (
              <WidgetArea
                key={`widget-${widget.id}`}
                block={block}
                widget={widget}
                widgetComponent={widgetComponent}
                extraWidgetProps={extraWidgetProps}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { block, editable, wrapper: BlockWrapper } = this.props

    if (BlockWrapper) {
      return (
        <BlockWrapper block={block} editable={editable}>
          {this.renderBlock()}
        </BlockWrapper>
      )
    }

    return this.renderBlock()
  }
}

// type Section = {
//   WidgetArea: React.ElementType
// }

export default Section