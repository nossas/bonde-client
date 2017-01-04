import React, { Component, PropTypes } from 'react'
import ReactGA from 'react-ga'
import { connect } from 'react-redux'

import { TechnicalIssues } from '../../../components/Error'
import { GoogleFontsLoader } from '../../../components/Fonts'
import * as arrayUtil from '../../../util/array'
import { Mobilization } from '../components'

import { findWidgets, isWidgetsLoaded } from '../../../scripts/Widget/reducer'
import { fetchMobilizations, mobilizationsIsLoaded } from '../../../scripts/Mobilization/MobilizationActions'
import {
  actions as BlockActions,
  selectors as BlockSelectors,
} from '../../mobilizations/blocks'


export class CustomDomainPage extends Component {

  static fetchData(store, params, query, host) {
    const regex = host.match(`(.+)\.${process.env.APP_DOMAIN}`)
    const findParams = regex ? { slug: regex[1].replace(/^www\./, '') } : { custom_domain: host }

    const promises = []

    if (!mobilizationsIsLoaded(store.getState())) {
      const action = fetchMobilizations(findParams)
      const dispatch = store.dispatch(action)
      promises.push(dispatch)
    }

    if (!BlockSelectors.isLoaded(store.getState())) {
      const action = BlockActions.asyncBlockSelect(findParams)
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

  componentDidMount() {
    const isTest = process.env.NODE_ENV === undefined || process.env.NODE_ENV === 'test'
    if (!isTest) {
      const { mobilization } = this.props

      ReactGA.initialize('UA-26278513-30')
      ReactGA.pageview('/' + mobilization.slug)

      if (mobilization.google_analytics_code) {
        ReactGA.initialize(
          mobilization.google_analytics_code,
          { gaOptions: { name: 'MobilizationTracker' } }
        )
        ReactGA.ga('MobilizationTracker.send', 'pageview', '/')
      }
    }
  }

  render() {
    const { mobilization } = this.props

    if (mobilization) {
      const { header_font, body_font } = mobilization

      return (
        <div>
          <Mobilization {...this.props} />
          <GoogleFontsLoader fonts={[header_font, body_font].filter(arrayUtil.distinct)} />
        </div>
      )
    }
    return <TechnicalIssues />
  }
}

CustomDomainPage.propTypes = {
  mobilization: PropTypes.object,
  blocks: PropTypes.array.isRequired,
  widgets: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  mobilization: state.mobilization.data[0],
  blocks: state.blocks.data,
  widgets: state.widgets.data
})

export default connect(mapStateToProps)(CustomDomainPage)
