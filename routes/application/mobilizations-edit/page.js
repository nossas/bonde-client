import React, { Component, PropTypes } from 'react'
// import { Navigation } from 'react-router'
// import reactMixin from 'react-mixin'

// Global module dependencies
import { Loading } from '~components/await'
import { GoogleFontsLoader } from '~components/fonts'
import * as arrayUtil from '~utils/array'
// import * as paths from '~client/paths'

// Current module dependencies
import { Mobilization } from '~mobilizations/components'

// @revert @reactMixin.decorate(Navigation)
export class MobilizationsEditPage extends Component {
  // componentDidMount () {
  //   const { mobilization, blocksIsLoaded, blocks } = this.props
  //   if (blocksIsLoaded && blocks.length === 0) {
  //     this.transitionTo(paths.mobilizationTemplatesChoose(mobilization))
  //   }
  // }

  render () {
    const {
      blocksIsLoaded,
      blocksIsLoading,
      widgetsIsLoaded,
      widgetsIsLoading,
      mobilization
    } = this.props
    const isLoaded = blocksIsLoaded && widgetsIsLoaded
    const isntLoading = !blocksIsLoading && !widgetsIsLoading

    if (isLoaded && isntLoading) {
      const fonts = [mobilization.header_font, mobilization.body_font].filter(arrayUtil.distinct)
      return (
        <div className='flex flex-auto overflow-hidden'>
          <Mobilization {...this.props} editable />
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
  blocks: PropTypes.array,
  blocksIsLoaded: PropTypes.bool,
  blocksIsLoading: PropTypes.bool.isRequired,
  blockEditionMode: PropTypes.bool,
  widgets: PropTypes.array,
  widgetsIsLoading: PropTypes.bool.isRequired,
  widgetsIsLoaded: PropTypes.bool.isRequired
}

export default MobilizationsEditPage
