import React, { PropTypes } from 'react'
import classnames from 'classnames'

import {
  Draft as DraftWidget,
  Content as ContentWidget,
  Form as FormWidget,
  Match as MatchWidget,
  Donation as DonationWidget,
  PressureWidget
} from '../Widget/plugins'

const widgetStrategy = (kind, props) => {
  switch (kind) {
    case 'content': return <ContentWidget {...props} />
    case 'form': return <FormWidget {...props} />
    case 'donation': return <DonationWidget {...props} />
    case 'match': return <MatchWidget {...props} />
    case 'pressure': return <PressureWidget {...props} />
    default: return <DraftWidget {...props} />
  }
}

const Widget = props => {
  const { widget } = props
  return (
    <div
      className={classnames(
        'px2 col mb4 md-mb0',
        `col-${widget.sm_size}`,
        `sm-col-${widget.sm_size}`,
        `md-col-${widget.md_size}`,
        `lg-col-${widget.lg_size}`
      )}
    >
      {widgetStrategy(widget.kind, props)}
    </div>
  )
}

export default Widget
