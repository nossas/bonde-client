import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchMobilizations, isMobilizationsLoaded } from './../../reducers/mobilizations'
import { findBlocks, isBlocksLoaded } from './../../reducers/blocks'
import { findWidgets, isWidgetsLoaded } from './../../reducers/widgets'
import { ShowMobilization } from './../'

const mapStateToProps = (state) => {
  return ({
    mobilizations: state.mobilizations,
    blocks: state.blocks,
    widgets: state.widgets
  })
}

export class CustomDomainWrapper extends React.Component {
  static propTypes = {
    mobilizations: PropTypes.object.isRequired,
    blocks: PropTypes.object.isRequired,
    widgets: PropTypes.object.isRequired,
    params: PropTypes.object
  }

  static fetchData(store, params, query, host) {
    host = host.replace(/^www\./, '')
    const regex = host.match(`(.+)\.${process.env.APP_DOMAIN}`)
    let findParams

    if (regex) {
      findParams = { slug: regex[1] }
    } else {
      findParams = { custom_domain: host }
    }

    const promises = []

    if (!isMobilizationsLoaded(store.getState())) {
      const action = fetchMobilizations(findParams)
      const dispatch = store.dispatch(action)
      promises.push(dispatch)
    }

    if (!isBlocksLoaded(store.getState())) {
      const action = findBlocks(findParams)
      const promise = store.dispatch(action)
      promises.push(promise)
    }

    if (!isWidgetsLoaded(store.getState())) {
      const action = findWidgets(findParams)
      const promise = store.dispatch(action)
      promises.push(promise)
    }

    return Promise.all(promises)
  }

  renderMobilization() {
    const { mobilizations, blocks, widgets } = this.props

    return (
      <ShowMobilization
        mobilization={mobilizations.data[0]}
        blocks={blocks}
        widgets={widgets}
        {...this.props}
      />
    )
  }

  renderMobilizationNotFound() {
    return (
      <div className='absolute top-0 bottom-0 left-0 right-0 flex flex-center bg-gray'>
        <div className='center flex-auto white'>
          <div className='h1'>Ops! Estamos com um problema técnico. Em caso de dúvida, escreva para <a href="mailto:contato@nossascidades.org">contato@nossascidades.org</a>.</div>
        </div>
      </div>
    )
  }

  render() {
    return (
      this.props.mobilizations.data.length === 0
       ? this.renderMobilizationNotFound()
       : this.renderMobilization()
    )
  }
}

export default connect(mapStateToProps)(CustomDomainWrapper)
