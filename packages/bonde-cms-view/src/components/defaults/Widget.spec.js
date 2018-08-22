import test from 'ava'
import React from 'react'
import { shallow } from 'enzyme'
import Widget from './Widget'

test('should custom wrapper component', t => {
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

test('should pass widget and children to custom component', t => {
  let expectedWidget, expectedChildren
  const RenderWidget = ({ widget, children }) => {
    expectedWidget = widget
    expectedChildren = children
  }
  const CustomWidget = () => <div />
  const widget = { kind: 'custom' }
  const node = shallow(
    <Widget widget={widget} renderWidget={RenderWidget}>
      <CustomWidget widget={widget} />
    </Widget>
  )

  t.is(expectedWidget, widget)
  t.deepEqual(expectedChildren, <CustomWidget widget={widget} />)
})
