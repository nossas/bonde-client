import { expect } from 'chai'

import { createEditorContent } from '../'

describe('RebooEditor.createEditorContent', () => {

  it('should return string rawContentState with text passed', () => {
    const text = 'Clique aqui para editar...'
    const str_result = createEditorContent(text)
    const json_result = JSON.parse(str_result)

    expect(json_result.blocks.length).to.equal(1)
    expect(json_result.blocks[0].text).to.equal(text)
  })
})
