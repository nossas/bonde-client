import React from 'react'

import * as WidgetComponents from './'

const DraftWidget = ({ widget, setWidget }) => {
  // Remove draft to simulate render menu
  const components = Object.assign({}, WidgetComponents)
  delete components['draft']

  return (
    <div className='draft-widget widget border center p2'>
      <h4>Escolha uma das opções abaixo</h4>
      {Object.keys(components).map(kind => {
        return (
          <button
            className='caps button bg-darken-4 mt1 p2 full-width'
            onClick={e => {
              e.preventDefault()
              setWidget(kind)
            }}>
            {kind}
          </button>
        )
      })}
    </div>
  )
}

export default DraftWidget
