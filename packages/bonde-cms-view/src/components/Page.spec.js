import test from 'ava'
import React from 'react'
import { shallow } from 'enzyme'
import PageStructure from './Page'
import { Footer, Navigation, Section } from './defaults' 

test.beforeEach(t => {
  t.context.defaultProps = {
    anchor: s => `section-${s.id}`,
    sections: [
      { id: 1, name: 'About' },
      { id: 2, name: 'Projects' }
    ],
    renderNavigationItem: ({ section, href }) => (
      <a href={href}>{section.name}</a>
    )
  }

  t.context.node = shallow(<PageStructure {...t.context.defaultProps} />)
})

// Navigation

test('should render a default navigation component', t => {
  const { node } = t.context
  t.is(node.find(Navigation).length, 1)
})

test('should pass sections to navigation component', t => {
  const { node, defaultProps } = t.context

  const navigation = node.find(Navigation)
  t.deepEqual(navigation.props().sections, defaultProps.sections)
})

test('should pass anchor function prop to navigation', t => {
  const { node, defaultProps } = t.context

  const index = 0
  const navigationProps = node.find(Navigation).at(index).props()
  const section = defaultProps.sections[index]

  t.is(navigationProps.uuid(section), defaultProps.anchor(section))
})

test('should pass renderNavigationItem to Navigation component', t => {
  const { node, defaultProps } = t.context

  const navigationProps = node.find(Navigation).props()

  const props = {
    section: defaultProps.sections[0],
    href: '#anchor-link'
  }
  t.deepEqual(
    navigationProps.renderNavigationItem(props),
    defaultProps.renderNavigationItem(props)
  )
})

// Sections

test('should render section components', t => {
  const { node, defaultProps } = t.context

  t.is(node.find(Section).length, defaultProps.sections.length)
})

test('should pass anchor function prop to sections', t => {
  const { node, defaultProps } = t.context

  const index = 0
  const sectionProps = node.find(Section).at(index).props()
  const section = defaultProps.sections[index]

  t.is(sectionProps.uuid(section), defaultProps.anchor(section))
})

// Footer tests

test('should render a default footer component', t => {
  const { node } = t.context
  t.is(node.find(Footer).length, 1)
})
