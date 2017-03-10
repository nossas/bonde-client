import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'

// Global module dependencies
import { Loading } from '~components/await'
import { GoogleFontsLoader } from '~components/fonts'
import * as arrayUtil from '~utils/array'
import * as paths from '~client/paths'

import Mobilization from '~client/mobrender/components/mobilization.connected'

export class MobilizationsEditPage extends Component {

  render () {
    const { mobilization, renderIsLoading } = this.props

    if (!renderIsLoading) {
      const fonts = [mobilization.header_font, mobilization.body_font].filter(arrayUtil.distinct)
      return (
        <div className='flex flex-auto overflow-hidden'>
          <Mobilization editable />
          <GoogleFontsLoader fonts={fonts} />
        </div>
      )
    }
    return <Loading />
  }
}

MobilizationsEditPage.propTypes = {
  mobilization: PropTypes.shape({
    id: PropTypes.number.isRequired,
    header_font: PropTypes.string,
    body_font: PropTypes.string
  }).isRequired,
  renderIsLoading: PropTypes.bool
}

export default MobilizationsEditPage
