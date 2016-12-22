import React, { PropTypes } from 'react'
import classnames from 'classnames'

import * as WidgetPlugins from '../plugins'

const Widget = ({ widget, ...rest }) => {
  const kind = widget.kind ? widget.kind.charAt(0).toUpperCase() + widget.kind.slice(1) : 'Draft'
  const Wrapper = WidgetPlugins[kind]

  const { sm_size, md_size, lg_size } = widget
  const className = classnames(
    'px2', 'col', 'mb4', 'md-mb0',
    'col-' + sm_size,
    'sm-col-' + sm_size,
    'md-col-' + md_size,
    'lg-col-' + lg_size
  )

  return (
    <div className={className}>
      {Wrapper ?
        <Wrapper {...rest} widget={widget} /> :
        <span className="red">Widget {widget.kind} not found</span>
      }
    </div>
  )
}

Widget.propTypes = {
  widget: PropTypes.shape({
    id: PropTypes.number.isRequired,
    kind: PropTypes.string.isRequired,
    sm_size: PropTypes.string,
    md_size: PropTypes.string,
    lg_size: PropTypes.string
  }).isRequired
}

export default Widget
