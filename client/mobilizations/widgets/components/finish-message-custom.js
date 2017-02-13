import React, { PropTypes } from 'react'

// Global module dependencies
import Editor from '~components/editor-draft-js'

const FinishMessageCustom = ({
  readOnly,
  widget: {
    settings: {
      finish_message: finishMessage,
      finish_message_background: finishMessageBackground
    }
  }
}) => (
  <Editor
    readOnly={readOnly}
    value={valueParse(finishMessage)}
    editorStyle={{
      backgroundColor: `rgba(${finishMessageBackground})`,
      borderRadius: 3
    }}
  />
)

//
// Helper functions
//
const valueParse = message => {
  try {
    return JSON.parse(message)
  } catch (e) {
    return message
  }
}

//
// PropTypes
//
FinishMessageCustom.propTypes = {
  widget: PropTypes.shape({
    settings: PropTypes.shape({
      finish_message: PropTypes.string.isRequired,
      finish_message_background: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  readOnly: PropTypes.bool
}

FinishMessageCustom.defaultProps = {
  readOnly: true
}

export default FinishMessageCustom
