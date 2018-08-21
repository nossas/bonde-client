import React from 'react'

export default class extends React.Component {
  
  static defaultProps = {
    widget: {},
    renderWidget: () => <div />
  }

  render () {   
    const { widget, renderWidget } = this.props
    
    return renderWidget({ widget })
  }
}
