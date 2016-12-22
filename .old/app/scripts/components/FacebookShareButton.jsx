import React, { PropTypes } from 'react'

export default class FacebookShareButton extends React.Component {
  static propTypes = {
    href: PropTypes.string.isRequired
  }

  handleClick() {
    const { href } = this.props

    window.open(
      `http://www.facebook.com/sharer.php?u=${href}`,
      'Compartilhar no Facebook',
      'width=800,height=600'
    )
  }

  render() {
    return (
      <button
        ref="button"
        className="btn white h3 p3 col-12 caps h5 rounded"
        onClick={::this.handleClick}
        style={{ backgroundColor: '#2D88ED' }}
      >
        Compartilhar no Facebook
      </button>
    )
  }
}
