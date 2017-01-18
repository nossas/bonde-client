import React, { PropTypes } from 'react'
import DocumentMeta from 'react-document-meta'
import { connect } from 'react-redux'

import * as MatchActions from '../action-creators'

export class ShareContainer extends React.Component {
  static fetchData (store, params) {
    const action = MatchActions.asyncMatchShow(params)
    const promise = store.dispatch(action)
    return Promise.all([promise])
  }

  metaData (props = this.props) {
    const { match: { data } } = props
    return { meta: { name: {
      'og:title': `${data.first_choice} + ${data.second_choice}`,
      'og:description': data.widget_title,
      'og:image': data.goal_image
    }}}
  }

  render () {
    return <DocumentMeta {...this.metaData()} />
  }
}

ShareContainer.propTypes = {
  match: PropTypes.object,
  params: PropTypes.object
}

const mapStateToProps = state => ({ match: state.widgets.plugins.match })

export default connect(mapStateToProps)(ShareContainer)
