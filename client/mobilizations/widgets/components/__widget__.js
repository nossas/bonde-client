import React, { PropTypes } from 'react'
import classnames from 'classnames'

import * as Plugins from '../__plugins__'

const Widget = ({ widget, ...rest }) => {
  const kind = widget.kind ? widget.kind.charAt(0).toUpperCase() + widget.kind.slice(1) : 'Draft'
  const Plugin = Plugins[kind]

  const className = classnames(
    `px2 col mb4 md-mb0 col-${widget.sm_size}`,
    `sm-col-${widget.sm_size} md-col-${widget.md_size} lg-col-${widget.lg_size}`
  )

  return (
    <div className={className}>
      {
        Plugin
        ? <Plugin {...rest} widget={widget} />
        : <span className='red'>Widget {kind} not found</span>
      }
    </div>
  )
}

Widget.propTypes = {
  widget: PropTypes.shape({
    id: PropTypes.number.isRequired,
    kind: PropTypes.string.isRequired,
    sm_size: PropTypes.number,
    md_size: PropTypes.number,
    lg_size: PropTypes.number
  }).isRequired
}

export default Widget
