import test from 'ava'
import React from 'react'
import { shallow } from 'enzyme'
import Widget from './Widget'

test('should custom widget component', t => {
  const WidgetByKind = ({ widget }) => {
    if (widget.kind === 'content') {
      return <p>Content</p>
    }
  }
  const widget = { sectionId: 1, kind: 'content' }
  const node = shallow(
    <Widget
      widget={widget}
      renderWidget={WidgetByKind}
    />
  )
  
  t.is(node.find('p').length, 1)
})
