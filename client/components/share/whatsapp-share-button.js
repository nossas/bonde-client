import React, { PropTypes } from 'react'

const WhatsAppShareButton = ({ href, mobilization }) => {
  return (
    <a
      className='btn white h3 p3 col-12 caps h5 rounded'
      href={`whatsapp://send?text=${href}`}
      style={{ backgroundColor: '#4CEC68', color: '#fff' }}
    >
      Compartilhar no WhatsApp
    </a>
  )
}

WhatsAppShareButton.propTypes = {
  href: PropTypes.string.isRequired
}

export default WhatsAppShareButton
