import React from 'react'

export default class Loading extends React.Component {
  render () {
    return (
      <div className='fixed top-0 right-0 bottom-0 left-0 bg-darken-4 z9'>
        <div className='table col-12 center full-height'>
          <i className='fa fa-circle-o-notch fa-spin fa-3x fa-w white table-cell align-middle' />
        </div>
      </div>
    )
  }
}
