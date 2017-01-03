import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import ContentWidget from '../'

describe('<ContentWidget />', () => {
  let contentWidget
  const stubContext = { store: {} }
  const props = {
    mobilization: {},
    widget: {
      settings: {}
    },
    editable: true,
    onEdit: () => {},
    onCancelEdit: () => {},
    dispatch: () => {},
    auth: {}
  }

  beforeEach(() => {
    contentWidget = shallow(<ContentWidget {...props} />, { context: stubContext })
  })

  it('should render new editor when settings content is JSON', () => {
    const widget = {
      settings: {
        content: '{ "entityMap": { "0": { "data": { "src": "https://s3.amazonaws.com/hub-central/uploads/1466044266_%5Bminhasampa%5Dmarca_footer.png" }, "type": "image", "mutability": "IMMUTABLE" } }, "blocks": [ { "inlineStyleRanges": [], "data": {}, "depth": 0, "type": "unstyled", "key": "92bdc2", "entityRanges": [], "text": "" }, { "inlineStyleRanges": [], "data": {}, "depth": 0, "type": "unstyled", "key": "bbbc16", "entityRanges": [], "text": "" }, { "inlineStyleRanges": [], "data": {}, "depth": 0, "type": "unstyled", "key": "b2c947", "entityRanges": [], "text": "" }, { "inlineStyleRanges": [ { "style": "center", "offset": 0, "length": 1 } ], "data": {}, "depth": 0, "type": "atomic", "key": "58ffba", "entityRanges": [ { "offset": 0, "length": 1, "key": 0 } ], "text": " " } ] }'
      }
    }
    contentWidget.setProps({ widget })
    expect(contentWidget.find('NewEditorContentWidget').length).to.equal(1)
  })

  it('should render old editor when settings content is HTML', () => {
    const widget = {
      settings: {
        content: '<div style="text-align: center;"><span>Clique aqui para editar o text...</span></div>'
      }
    }
    contentWidget.setProps({ widget })
    expect(contentWidget.find('OldEditorContentWidget').length).to.equal(1)
  })

  it('should render new editor when forceRenderNewEditor is true', () => {
    const widget = {
      settings: {
        content: '<div style="text-align: center;"><span>Clique aqui para editar o text...</span></div>'
      }
    }
    contentWidget.setProps({ widget })
    contentWidget.setState({ forceRenderNewEditor: true })
    expect(contentWidget.find('NewEditorContentWidget').length).to.equal(1)
  })
})
