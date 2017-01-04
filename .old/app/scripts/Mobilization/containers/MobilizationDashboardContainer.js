import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { fetchWidgets, isWidgetsLoaded } from '../../Widget/reducer'
import { getMobilization } from '../MobilizationSelectors'
import { setCurrentMobilizationId } from '../MobilizationActions'
import { GoogleFontsLoader } from '../../../components/Fonts'
import * as arrayUtil from '../../../util/array'
import {
  actions as BlockActions,
  selectors as BlockSelectors,
} from '../../../modules/mobilizations/blocks'


class MobilizationDashboardContainer extends React.Component {
  static propTypes = {
    blocks: PropTypes.object.isRequired,
    widgets: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    mobilization: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    children: PropTypes.object
  }

  static fetchData(store, params) {
    const promises = []
    if (!BlockSelectors.isLoaded(store.getState())) {
      const action = BlockActions.asyncBlockFetch(params.mobilization_id)
      const promise = store.dispatch(action)
      promises.push(promise)
    }
    if (!isWidgetsLoaded(store.getState())) {
      const action = fetchWidgets({mobilization_id: params.mobilization_id})
      const promise = store.dispatch(action)
      promises.push(promise)
    }
    return Promise.all(promises)
  }

  componentDidMount() {
    // TODO this callback is a workaround to load data in client-side
    // but it should be replaced by the static fetchData method that is fetching
    // data only in the server-side for now
    const {dispatch, mobilization} = this.props
    dispatch(BlockActions.asyncBlockFetch(mobilization.id))
    dispatch(fetchWidgets({mobilization_id: mobilization.id}))
    dispatch(setCurrentMobilizationId(mobilization.id))
  }

  render() {
    const { children, ...otherProps } = this.props
    const { mobilization: { header_font: headerFont, body_font: bodyFont } } = otherProps
    const fonts = [headerFont, bodyFont].filter(arrayUtil.distinct)

    return (
      <div className='flex flex-auto overflow-hidden'>
        {children && React.cloneElement(children, {...otherProps})}
        <GoogleFontsLoader fonts={fonts} />
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  auth: state.auth,
  blocks: state.blocks,
  widgets: state.widgets,
  mobilization: getMobilization(state, props)
})

export default connect(mapStateToProps)(MobilizationDashboardContainer)
