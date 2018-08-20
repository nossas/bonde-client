import React from 'react'

export default class extends React.Component {
  
  static defaultProps = {
    uuid: s => s.id,
    section: {}
  }

  render() {   
    const { uuid, section } = this.props
    
    return (
      <div id={uuid(section)} />
    )
  }
}
