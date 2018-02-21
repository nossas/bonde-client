import React from 'react'
import Prism from 'prismjs'
import 'prismjs/themes/prism.css'

const createMarkup = (code) => ({
  __html: Prism.highlight(code, Prism.languages.js)
})

export default ({ code }) => (
  <div dangerouslySetInnerHTML={createMarkup(code)} />
)
