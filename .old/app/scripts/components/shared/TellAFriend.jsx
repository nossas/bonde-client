import React, { PropTypes } from 'react'
import * as Paths from './../../Paths'
import { FacebookShareButton, TwitterShareButton } from './../'

export default class TellAFriend extends React.Component {
  static propTypes = {
    mobilization: PropTypes.object.isRequired,
    message: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    imageWidth: PropTypes.string
  }

  render() {
    const { href, message, mobilization, imageUrl, imageWidth } = this.props
    const checkMarkImage = imageUrl || require('./checkMarkImage.png')

    return (
      <div className='center p3 bg-white darkengray rounded'>
        <div className='m0 h3 bold'>{message}</div>
        <div className='py2'>
          <img src={checkMarkImage} style={{width: imageWidth || '100px'}} />
        </div>
        <p>Agora, compartilhe com seus amigos!</p>
        <p><FacebookShareButton href={href} /></p>
        <p><TwitterShareButton href={href} text={mobilization.twitter_share_text} /></p>
      </div>
    )
  }
}
