import test from 'ava'
import React from 'react'
import { shallow } from 'enzyme'
import Background from './Background'
import SectionRow from './'
import Row from './Row'

test.beforeEach(t => {
  t.context.defaultProps = {
    children: <p>About</p>,
    section: {
      bgImage: 'http://link.me'
    }
  }
  t.context.node = shallow(<SectionRow {...t.context.defaultProps} />)
})

test('should render Background with section.bgImage', t => {
  const { node, defaultProps } = t.context
  const bgProps = node.find(Background).props()

  t.is(bgProps.bgImage, defaultProps.section.bgImage)
})

test('should render children inside Row', t => {
  const { node } = t.context
  const row = node.find(Row)

  t.is(row.find('p').length, 1)
})
