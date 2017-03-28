import React, { PropTypes } from 'react'
import classnames from 'classnames'

const WhatsAppShareButton = ({ preview, href, mobilization }) => {
  return (
    <a
      className={classnames('btn white h3 p3 col-12 caps h5 rounded', { 'lg-hide': !preview })}
      href={`whatsapp://send?text=${href}`}
      style={{ backgroundColor: '#4CEC68', color: '#fff' }}
    >
      Compartilhar no WhatsApp
    </a>
  )
}

WhatsAppShareButton.propTypes = {
  href: PropTypes.string.isRequired,
  preview: PropTypes.bool
}

export default WhatsAppShareButton
