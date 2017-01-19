import React, { Component, PropTypes } from 'react'
import ReactGA from 'react-ga'
import { connect } from 'react-redux'

// Global module dependencies
import { TechnicalIssues } from '~components/error'
import { GoogleFontsLoader } from '~components/fonts'
import * as arrayUtil from '~util/array'

// Children modules dependencies
import {
  actions as BlockActions,
  selectors as BlockSelectors
} from '~mobilizations/blocks'
import {
  actions as WidgetActions,
  selectors as WidgetSelectors
} from '~mobilizations/widgets'

// Current module dependencies
import * as MobilizationSelectors from '../selectors'
import * as MobilizationActions from '../action-creators'
import { Mobilization } from '../components'

export class CustomDomainPage extends Component {

  static fetchData (store, params, query, host) {
    // eslint-disable-next-line
    const regex = host.match(`(.+)\.${process.env.APP_DOMAIN}`)
    const findParams = regex ? { slug: regex[1].replace(/^www\./, '') } : { custom_domain: host }

    const promises = []

    if (!MobilizationSelectors.isLoaded(store.getState())) {
      const action = MobilizationActions.asyncFilter(findParams)
      const dispatch = store.dispatch(action)
      promises.push(dispatch)
    }

    if (!BlockSelectors.isLoaded(store.getState())) {
      const action = BlockActions.asyncBlockSelect(findParams)
      const promise = store.dispatch(action)
      promises.push(promise)
    }

    if (!WidgetSelectors.isLoaded(store.getState())) {
      const action = WidgetActions.asyncWidgetSelect(findParams)
      const promise = store.dispatch(action)
      promises.push(promise)
    }

    return Promise.all(promises)
  }

  componentDidMount () {
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

  render () {
    const { mobilization } = this.props

    if (mobilization) {
      const { header_font: headerFont, body_font: bodyFont } = mobilization

      return (
        <div>
          <Mobilization {...this.props} />
          <GoogleFontsLoader fonts={[headerFont, bodyFont].filter(arrayUtil.distinct)} />
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

const mapStateToProps = (state, props) => ({
  mobilization: MobilizationSelectors.getList(state)[0],
  blocks: state.blocks.data,
  widgets: state.widgets.list.data
})

export default connect(mapStateToProps)(CustomDomainPage)
