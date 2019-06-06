import PropTypes from 'prop-types'
import React, { Component } from 'react'
// Global module dependencies
import { Loading } from 'components/await'
import { GoogleFontsLoader } from 'components/fonts'
import * as arrayUtil from 'utils/array'
import * as paths from 'paths'

import Mobilization from 'mobrender/components/mobilization.connected'
import MobilizationPreview from './preview'


const styles = {
  modeButton: {
    position: 'fixed',
    bottom: '10px',
    left: 0,
    right: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100px'
  }
}

const ModeButton = ({ mode, toggle }) => (
  <button type='button' onClick={toggle} style={styles.modeButton}>
    {mode === 'preview' ? 'Editar' : 'Visualizar'}
  </button>
)

export class MobilizationsEditPage extends Component {
  
  constructor (props) {
    super(props)
    this.state = { preview: false }
  }

  componentWillReceiveProps (nextProps) {
    const { mobilization, blocksIsLoaded, blocks } = nextProps
    if (blocksIsLoaded && blocks.length === 0) {
      this.props.history.push(paths.mobilizationTemplatesChoose(mobilization))
    }
  }

  render () {
    const { mobilization, renderIsLoading } = this.props
    const { preview } = this.state

    if (!renderIsLoading) {
      const fonts = [mobilization.header_font, mobilization.body_font].filter(arrayUtil.distinct)
      return (
        <div className='flex flex-auto overflow-hidden'>
          {!preview ? (
            <Mobilization editable history={this.props.history} />
          ) : (
            <MobilizationPreview />
          )}
          <GoogleFontsLoader fonts={fonts} />
          <ModeButton
            mode={preview ? 'preview' : 'edit'}
            toggle={() => {
              if (this.state.preview) {
                this.setState({ preview: false })
              } else {
                this.setState({ preview: true })
              }
            }}
          />
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
  }),
  renderIsLoading: PropTypes.bool,
  blocks: PropTypes.array,
  blockIsLoaded: PropTypes.bool
}

export default MobilizationsEditPage
