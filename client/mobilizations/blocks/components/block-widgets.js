import React, { PropTypes } from 'react'

// Sibling module dependencies
import Widget from '~mobilizations/widgets/components'

const BlockWidgets = ({ widgets, props, onChange }) => (
  <div>
    {widgets.map(widget => (
      <Widget
        {...props}
        key={`widget-${widget.id}`}
        widget={widget}
        onEdit={() => onChange({ editingWidget: true })}
        onCancelEdit={() => onChange({ editingWidget: false })}
      />
    ))}
  </div>
)

BlockWidgets.propTypes = {
  widgets: PropTypes.array,
  props: PropTypes.object,
  onChange: PropTypes.func
}

export default BlockWidgets
