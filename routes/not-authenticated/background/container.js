import React, { PropTypes } from 'react'

import { Background } from '~client/components/layout'
import { ZendeskWidget } from '~components/external-services'

const BackgroundContainer = ({ children }) => (
  <div>
    <ZendeskWidget />
    <Background image={process.env.BROWSER ? require('~client/images/bg-login.png') : ''}>
      {children}
    </Background>
  </div>
)

BackgroundContainer.propTypes = {
  children: PropTypes.node.isRequired
}

export default BackgroundContainer
