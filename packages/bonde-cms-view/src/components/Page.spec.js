import test from 'ava'
import React from 'react'
import { shallow } from 'enzyme'
import PageStructure from './Page'
import { Footer, Navigation, Section } from './defaults' 

test.beforeEach(t => {
  t.context.node = shallow(<PageStructure />)
})

// Navigation

test('should render a default navigation component', t => {
  const { node } = t.context
  t.is(node.find(Navigation).length, 1)
})

test('should pass sections to navigation component', t => {
  const { node } = t.context
  const sections = [{ name: 'About', uuid: 1 }, { name: 'Projects', uuid: 2 }]
  node.setProps({ sections })

  const navigation = node.find(Navigation)
  t.deepEqual(navigation.props().sections, sections)
})

test('should pass anchor function prop to navigation', t => {
  const { node } = t.context
  const sections = [{ name: 'About', id: 1 }]
  node.setProps({ anchor: (s) => `section-${s.id}`, sections })

  const navigationProps = node.find(Navigation).props()
  const section = sections[0]
  t.is(navigationProps.uuid(section), `section-${section.id}`)
})

// Sections

test('should render section components', t => {
  const { node } = t.context
  const sections = [{ name: 'About', uuid: 1 }, { name: 'Projects', uuid: 2 }]
  node.setProps({ sections })

  t.is(node.find(Section).length, sections.length)
})

test('should pass anchor function prop to sections', t => {
  const { node } = t.context
  const sections = [{ name: 'About', id: 1 }]
  node.setProps({ anchor: (s) => `section-${s.id}`, sections })

  const sectionProps = node.find(Section).props()
  const section = sections[0]
  t.is(sectionProps.uuid(section), `section-${section.id}`)
})

// Footer tests

test('should render a default footer component', t => {
  const { node } = t.context
  t.is(node.find(Footer).length, 1)
})
