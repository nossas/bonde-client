import React from 'react'
import PropTypes from 'prop-types'


class DraggableItem extends React.Component {
  render() {
    const { children, model, onDragStart } = this.props
    return (
      <div
        draggable
        className='draggable-item'
        onDragStart={(event) => {
          onDragStart && onDragStart(model, event)
        }}
      >
        {children}
      </div>
    )
  }
}

DraggableItem.propTypes = {
  color: PropTypes.string,
  model: PropTypes.any,
  onDragStart: PropTypes.func,
}

export default DraggableItem