import test from 'ava'
import React from 'react'
import { shallow } from 'enzyme'
import Col from './Col'
import Widget from './'

test.beforeEach(t => {
  t.context.defaultProps = {
    widget: {
      lgSize: 6,
      mdSize: 6,
      smSize: 12
    }
  }
  t.context.node = shallow(<Widget {...t.context.defaultProps} />)
})

test('should pass sizes to Col component', t => {
  const { node, defaultProps } = t.context
  const colProps = node.find(Col).props()

  t.is(colProps.lg, defaultProps.widget.lgSize)
  t.is(colProps.md, defaultProps.widget.mdSize)
  t.is(colProps.sm, defaultProps.widget.smSize)
})
