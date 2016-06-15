import React, { PropTypes } from 'react'
import $ from 'jquery'

export default class NavbarButton extends React.Component {
  static propTypes = {
    targetId: PropTypes.string.isRequired,
    scrollableId: PropTypes.string.isRequired,
    className: PropTypes.string,
    children: PropTypes.string,
    hidden: PropTypes.bool
  }

  handleClick(e) {
    e.preventDefault()
    const { targetId, scrollableId } = this.props
    const target = $(`#${targetId}`)
    const scrollable = $(`#${scrollableId}`)
    const yPosition = target.position().top + scrollable.scrollTop() - scrollable.position().top

    scrollable.stop().animate({scrollTop: yPosition}, 500, () => {
      window.location.hash = targetId
    })
  }

  render() {
    const {className, children, hidden} = this.props

    return (
      <a
        className={className + ' relative'}
        onClick={::this.handleClick}>
        <span style={{opacity: hidden ? '.25' : '1'}}>
          {children}
        </span>
        {
          hidden &&
            <div className='h2 absolute top-0 bottom-0 left-0 right-0 center flex flex-center'>
              <i className='fa fa-eye-slash flex-auto'/>
            </div>
        }
      </a>
    )
  }
}
