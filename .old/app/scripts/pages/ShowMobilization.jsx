import React, { PropTypes } from 'react'
import classnames from 'classnames'
import DocumentMeta from 'react-document-meta'
import { Block, Navbar } from './../components'
import ReactGA from 'react-ga'

export default class ShowMobilization extends React.Component {
  static propTypes = {
    mobilization: PropTypes.object.isRequired,
    blocks: PropTypes.object.isRequired,
    widgets: PropTypes.object.isRequired
  }

  componentDidMount() {
    let mob = this.props.mobilization

    ReactGA.initialize('UA-26278513-30')
    ReactGA.pageview('/' + mob.slug)

    if (mob.google_analytics_code) {
      ReactGA.initialize(
        mob.google_analytics_code,
        { gaOptions: { name: 'MobilizationTracker' } }
      )
      ReactGA.ga('MobilizationTracker.send', 'pageview', '/')
    }
  }

  metaData(mobilization) {
    return {
      title: mobilization.name,
      description: mobilization.goal,
      meta: {
        name: {
          'viewport': 'width=device-width, initial-scale=1',
          'og:title': mobilization.facebook_share_title,
          'og:description': mobilization.facebook_share_description,
          'og:image': mobilization.facebook_share_image
        }
      }
    }
  }

  render() {
    const { mobilization, blocks, widgets } = this.props
    const {
      color_scheme: colorScheme,
      header_font: headerFont,
      body_font: bodyFont
    } = mobilization

    const pageClasses = classnames(
      colorScheme,
      `${headerFont}-header`,
      `${bodyFont}-body`,
      'absolute',
      'flex',
      'flex-column'
    )

    return (
      <div className={pageClasses} style={{top: 0, bottom: 0, left: 0, right: 0}}>
        <Navbar blocks={blocks} mobilization={mobilization} />
        <div id='blocks-list' className='flex-auto' style={{overflowY: 'scroll'}}>
          {
            blocks.data.map((block) => {
              if (!block.hidden) {
                return (
                  <Block
                    key={'block-' + block.id}
                    block={block}
                    editable={false}
                    mobilization={mobilization}
                    widgets={widgets}
                    {...this.props}
                  />
                )
              }
            })
          }
        </div>
        <DocumentMeta {...this.metaData(mobilization)} />
      </div>
    )
  }
}
