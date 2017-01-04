import React, { PropTypes } from 'react'

import Widget from './../../Widget'

const BlockWidgets = ({ widgets }) => {
  return (
    <div className="clearfix" style={{padding: '5em 0'}}>
      {/* Render widgets */}
      {widgets && widgets.map(widget => {
        return <Widget widget={widget} />
      })}
    </div>
  )
}

BlockWidgets.propTypes = {
  widgets: PropTypes.array
}

export default BlockWidgets
