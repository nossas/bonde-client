import React from 'react'
import { Editor, EditorState, convertFromRaw } from 'draft-js'
import decorator from './decorator'

const DraftEditor = ({ content }) => {
  
  const rawContent = convertFromRaw(content)
  const editorState = EditorState
    .createWithContent(rawContent, decorator)
  
  return (
    <Editor
      editorState={editorState}
      readOnly={true}
    />
  )
}

export default DraftEditor
