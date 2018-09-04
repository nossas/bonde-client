import React from 'react'
import PropTypes from 'prop-types'
import { SlateEditor, SlateContent } from 'slate-editor'
import { AlignmentPlugin } from '@slate-editor/alignment-plugin'
import { BoldPlugin } from '@slate-editor/bold-plugin'
import { ColorPlugin } from '@slate-editor/color-plugin'
import { EmbedPlugin } from '@slate-editor/embed-plugin'
import { FontFamilyPlugin } from '@slate-editor/font-family-plugin'
import { FontSizePlugin } from '@slate-editor/font-size-plugin'
import { GridPlugin } from '@slate-editor/grid-plugin'
import { ImagePlugin } from '@slate-editor/image-plugin'
import { ItalicPlugin } from '@slate-editor/italic-plugin'
import { LinkPlugin } from '@slate-editor/link-plugin'
import { ListPlugin } from '@slate-editor/list-plugin'
import { StrikethroughPlugin } from '@slate-editor/strikethrough-plugin'
import { UnderlinePlugin } from '@slate-editor/underline-plugin'

const plugins = [
  AlignmentPlugin(),
  BoldPlugin(),
  ColorPlugin(),
  EmbedPlugin(),
  FontFamilyPlugin(),
  FontSizePlugin({ initialFontSize: 16 }),
  GridPlugin(),
  ImagePlugin(),
  ItalicPlugin(),
  LinkPlugin(),
  ListPlugin(),
  StrikethroughPlugin(),
  UnderlinePlugin()
]

const Editor = ({ content }) => (
  <SlateEditor plugins={plugins} initialState={content}>
    <SlateContent readOnly={true} />
  </SlateEditor>
)

Editor.propTypes = {
  content: PropTypes.object.isRequired
}

export default Editor
