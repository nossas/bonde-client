import React, { PropTypes } from 'react'
import DocumentMeta from 'react-document-meta'
import { connect } from 'react-redux'

import { showMatch } from '../reducer'

export class ShareContainer extends React.Component {
  static propTypes = {
    matches: PropTypes.object,
    params: PropTypes.object
  }

  static fetchData(store, params) {
    const action = showMatch(params)
    const promise = store.dispatch(action)
    return Promise.all([promise])
  }

  metaData(props = this.props) {
    const { matches: { data } } = props
    return { meta: { name: {
      'og:title': `${data.first_choice} + ${data.second_choice}`,
      'og:description': data.widget_title,
      'og:image': data.goal_image
    }}}
  }

  render() {
    return <DocumentMeta { ...this.metaData() } />
  }
}

const mapStateToProps = state => ({ matches: state.matches })

export default connect(mapStateToProps)(ShareContainer)
