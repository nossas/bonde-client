import React, { PropTypes } from 'react'

import './scss/mobilization-list-item-avatar.scss'

const MobilizationListItemAvatar = ({ image, facebook_share_image, imageSize }) => (
  <div className="list-item-avatar left">
    {
      image || facebook_share_image ? (
        <div
          className="avatar-width avatar-height bg-cover bg-center overflow-hidden"
          style={{
            backgroundImage: `url(${image || facebook_share_image})`,
            width: imageSize.width,
            height: imageSize.height
          }}
        />
      ) : (
        <div className="avatar-width avatar-height bg-darken-2 table">
          <i className="fa fa-picture-o white table-cell align-middle center" />
        </div>
      )
    }
  </div>
)

MobilizationListItemAvatar.propTypes = {
  image: PropTypes.string,
  facebook_share_image: PropTypes.string,
  imageSize: PropTypes.shape({ width: PropTypes.string, height: PropTypes.string })
}

MobilizationListItemAvatar.defaultProps = {
  imageSize: { width: '90px', height: '90px' }
}

export default MobilizationListItemAvatar
