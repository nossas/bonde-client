import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

import BlockContainer from '../../Block/containers/BlockContainer'
import { getBlocks } from '../../Block/BlockSelectors'

class ShowMobilizationContainer extends Component {
  render() {
    const {
      widgets,
      mobilization: { color_scheme, header_font, body_font }
    } = this.props
    const pageClass = classnames(
      color_scheme,
      `${header_font}-header`,
      `${body_font}-body`,
      'absolute',
      'flex',
      'flex-column'
    )

    // TODO: Should ordered of blocks in reducers?
    const { blocks, editable } = this.props
    if (blocks && blocks.length > 1) {
      blocks.sort((a, b) => a.position - b.position)
    }

    return (
      <div className={pageClass}  style={{top: 0, bottom: 0, left: 0, right: 0}}>
        <div id='blocks-list' className='flex-auto' style={{overflowY: 'scroll'}}>
          {blocks && blocks.map((block, index) => {
            if (!editable && block.hidden) {
              return null
            }
            return (
              <BlockContainer
                key={`block-container-${index}`}
                block={block}
                editable={editable}
                widgets={widgets}
              />
            )
          })}
        </div>
      </div>
    )
  }
}

ShowMobilizationContainer.propTypes = {
  mobilization: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    goal: PropTypes.string,

    google_analytics_code: PropTypes.string,
    facebook_share_title: PropTypes.string,
    facebook_share_description: PropTypes.string,
    facebook_share_image: PropTypes.string,

    color_scheme: PropTypes.string.isRequired,
    header_font: PropTypes.string.isRequired,
    body_font: PropTypes.string.isRequired
  }),
  blocks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    bg_class: PropTypes.string.isRequired,
    bg_image: PropTypes.string,
    hidden: PropTypes.bool,
    position: PropTypes.number
  })),
  editable: PropTypes.bool,
  widgets: PropTypes.array.isRequired
}


const mapStateToProps = (globalState, props) => {
  return {
    blocks: getBlocks(globalState, props.mobilization.id)
  }
}

export default ShowMobilizationContainer
