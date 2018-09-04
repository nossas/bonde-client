import React from 'react'
import PropTypes from 'prop-types'
import { SlateEditor } from './components'

class ContentUI extends React.Component {
  
  getContent () {
    const { content } = this.props
    return content ? JSON.parse(this.props.content) : {}
  }

  render () {
    return (
      <SlateEditor content={this.getContent()} />
    )
  }
}

ContentUI.propTypes = {
  content: PropTypes.string
}

export default ContentUI
