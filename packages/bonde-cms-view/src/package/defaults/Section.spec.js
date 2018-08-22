import test from 'ava'
import React from 'react'
import { shallow } from 'enzyme'
import Section from './Section'

test.beforeEach(t => {
  t.context.defaultProps = {
    uuid: (s) => `section-${s.id}`,
    section: { id: 1, name: 'About' }
  }
  t.context.node = shallow(<Section {...t.context.defaultProps} />)
})

test('should mount id of section with function uuid', t => {
  const { node, defaultProps } = t.context

  t.is(node.find(`#${defaultProps.uuid(defaultProps.section)}`).length, 1)
})

test('should custom section wrapper component', t => {
  const { node } = t.context
  const renderSection = ({ children, section }) => (
    <div id={`${section.name}`}>
      {section.name}
    </div>
  )
  node.setProps({ renderSection })

  t.is(node.find('#About').length, 1)
})
