import PropTypes from 'prop-types';
import React from 'react';

const TwitterShareButton = props => {
  const handleClick = () => {
    // Optional Query params
    // via: twitter user to associate with the tweet
    // related: additional users related to the tweet comma-separated
    // hashtags: comma-separated list without #

    const { href, text } = props
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${href}`,
      'Compartilhar no Twitter',
      'width=800,height=600'
    )
  }

  return (
    <button
      className='btn white h3 p3 col-12 caps h5 rounded'
      onClick={handleClick}
      style={{backgroundColor: '#3DD1F4'}}
    >
      Compartilhar no Twitter
    </button>
  )
}

TwitterShareButton.propTypes = {
  href: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}

export default TwitterShareButton
