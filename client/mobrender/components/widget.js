import React, { PropTypes } from 'react'
import classnames from 'classnames'
import { browserHistory } from 'react-router'
import { Loading } from '~client/components/await'
import WidgetOverlay from './widget-overlay.connected'

import widgets from '../widgets/config'

const Widget = ({ editable, mobilization, widget, update, saving }) => {
  // Resize column widget
  const { sm_size, md_size, lg_size } = widget
  const className = classnames(
    `px2 col mb4 md-mb0 col-${sm_size}`,
    `sm-col-${sm_size} md-col-${md_size} lg-col-${lg_size}`
  )

  const widgetConfig = widgets(mobilization, widget).filter(w => w.kind === widget.kind)[0]
  const { component: Component, redirect } = widgetConfig

  const widgetComponent = <Component mobilization={mobilization} widget={widget} update={update} editable={editable} />
  return (
    <div className={className}>
      {saving && <Loading />}
      {editable && redirect ? (
        <WidgetOverlay
          widget={widget}
          onClick={() => {
            browserHistory.push(redirect)
          }}
        >
          {widgetComponent}
        </WidgetOverlay>
      ) : widgetComponent}
    </div>
  )
}

Widget.propTypes = {
  mobilization: PropTypes.object,
  widget: PropTypes.object.isRequired,
  editable: PropTypes.bool,
  // Injected by redux
  update: PropTypes.func.isRequired,
  saving: PropTypes.bool
}

export default Widget
