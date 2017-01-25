import React, { PropTypes } from 'react'

import { FacebookShareButton, TwitterShareButton } from '~components/share'

const TellAFriend = ({ href, message, mobilization, imageUrl, imageWidth }) => (
  <div className='center p3 bg-white darkengray rounded'>
    <div className='m0 h3 bold'>{message}</div>
    <div className='py2'>
      <img src={imageUrl} style={{ width: imageWidth || 100 }} />
    </div>
    <p>Agora, compartilhe com seus amigos!</p>
    <p><FacebookShareButton href={href} /></p>
    <p><TwitterShareButton href={href} text={mobilization.twitter_share_text} /></p>
  </div>
)

TellAFriend.propTypes = {
  mobilization: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  imageWidth: PropTypes.string
}

TellAFriend.defaultProps = {
  imageUrl: require('./check-mark-image.png')
}

export default TellAFriend
