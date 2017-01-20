import React from 'react'
import classnames from 'classnames'

class BasicColorPickerItem extends React.Component {
  render () {
    const { bgClass, selectedClass, onClick } = this.props
    return (
      <div className='col col-1 p1'>
        <div
          className={classnames(
            'col col-12 border-only-bottom border-darken-3 rounded btn bg-white',
            bgClass
          )}
          style={bgClass === selectedClass ? { borderWidth: '5px' } : null}
          onClick={onClick}
          data-bg-class={bgClass}
        >
          <br />
        </div>
      </div>
    )
  }
}

export default BasicColorPickerItem
