import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { DraftEditor, SlateEditor } from './components'


const StyleWYSIWYG = styled.div`
  a.wysihtml5-command-active,
  a.wysihtml5-command-dialog-opened {
    background-color: $darken-3;
  }

  .wysiwyg-font-size-h6 { font-size: .5rem; }
  .wysiwyg-font-size-h5 { font-size: 1rem; }
  .wysiwyg-font-size-h4 { font-size: 1.5rem; }
  .wysiwyg-font-size-h3 { font-size: 2rem; }
  .wysiwyg-font-size-h2 { font-size: 3rem; }
  .wysiwyg-font-size-h1 { font-size: 5rem; }
`

class ContentUI extends React.Component {
  
  getComponentContent () {
    try { 
      const content = this.props.content ? JSON.parse(this.props.content) : {}
      // When entityMap only by DraftJS state
      if (!content.entityMap) {
        return <SlateEditor content={content} />
      }
      // Render DraftJS state
      return <DraftEditor content={content} />
    } catch (e) {
      // When content is html, render WYSIWYG
      return (
        <StyleWYSIWYG
          dangerouslySetInnerHTML={{
            __html: this.props.content
          }}
        />
      )
    }
  }

  render () {
    return this.getComponentContent()
  }
}

ContentUI.propTypes = {
  content: PropTypes.string
}

export default ContentUI
