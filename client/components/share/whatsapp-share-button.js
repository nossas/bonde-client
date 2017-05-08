import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames'

const WhatsAppShareButton = ({ preview, whatsappText, mobilization }) => {
  return (
    <a
      className={classnames(
        'btn white h3 p3 col-12 caps h5 rounded border-box',
        { 'lg-hide': !preview }
      )}
      href={`whatsapp://send?text=${encodeURIComponent(whatsappText)}`}
      style={{ backgroundColor: '#4CEC68', color: '#fff' }}
    >
      Compartilhar no WhatsApp
    </a>
  )
}

WhatsAppShareButton.propTypes = {
  href: PropTypes.string.isRequired,
  preview: PropTypes.bool,
  whatsappText: PropTypes.string
}

export default WhatsAppShareButton
