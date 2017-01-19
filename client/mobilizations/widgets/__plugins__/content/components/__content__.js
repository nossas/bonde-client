import React, { Component, PropTypes } from 'react'

// Current module depepdencies
import { EditorOld, EditorNew } from '../components'

class Content extends Component {
  constructor (props) {
    super(props)
    this.state = { forceRenderNewEditor: false }
  }

  handleForceRender () {
    this.setState({ forceRenderNewEditor: true })
  }

  render () {
    const { widget: { settings } } = this.props

    try {
      // If parse content is RebooEditor
      JSON.parse(settings.content)
      return <EditorNew {...this.props} />
    } catch (e) {
      // Else is old editor
      if (this.state.forceRenderNewEditor) {
        return <EditorNew {...this.props} />
      } else {
        return (
          <EditorOld
            handleForceRender={this.handleForceRender.bind(this)}
            {...this.props}
          />
        )
      }
    }
  }
}

Content.propTypes = {
  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired,
  editable: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  onCancelEdit: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default Content
