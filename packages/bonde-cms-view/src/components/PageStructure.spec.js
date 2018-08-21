import test from 'ava'
import React from 'react'
import { shallow } from 'enzyme'
import PageStructure from './PageStructure'
import { Navigation, Section, Widget } from './defaults' 

test.beforeEach(t => {
  t.context.defaultProps = {
    anchor: s => `section-${s.id}`,
    sections: [
      { id: 1, name: 'About' },
      { id: 2, name: 'Projects' }
    ],
    widgets: [
      { kind: 'content', sectionId: 1 },
      { kind: 'draft', sectionId: 1 },
      { kind: 'draft', sectionId: 2 }
    ],
    relationship: (s, widgets) => widgets.filter(
      w => w.sectionId === s.id
    ),
    renderWidget: () => <div />,
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

test('should pass renderNavigation to Navigation component', t => {
  const { node, defaultProps } = t.context
  const renderNavigation = ({ children }) => <div />
  node.setProps({ renderNavigation })

  const navigationProps = node.find(Navigation).props()
  const props = {
    children: [{ id: 1, name: 'About' }]
  }
  
  t.deepEqual(
    navigationProps.renderNavigation(props),
    renderNavigation(props)
  )
})

test('should change ordering sections on navigation', t => {
  const { node, defaultProps } = t.context
  const orderDesc = (s1, s2) => s2.id - s1.id
  node.setProps({ ordering: orderDesc })

  const sections = defaultProps.sections.sort(orderDesc)

  t.deepEqual(node.find(Navigation).props().sections, sections)
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

test('should pass renderSection to Section component', t => {
  const { node, defaultProps } = t.context
  const renderSection = ({ section }) => (
    <div>
      {section.name}
    </div>
  )
  node.setProps({ renderSection })

  const index = 0
  const sectionProps = node.find(Section).at(0).props()
  const props = {
    section: defaultProps.sections[0]
  }
  
  t.deepEqual(
    sectionProps.renderSection(props),
    renderSection(props)
  )
})

test('should change ordering on sections render', t => {
  const { node, defaultProps } = t.context
  const orderDesc = (s1, s2) => s2.id - s1.id
  node.setProps({ ordering: orderDesc })

  const sections = defaultProps.sections.sort(orderDesc)

  t.is(node.find(Section).at(0).props().section, sections[0])
  t.is(node.find(Section).at(1).props().section, sections[1])
})

// Widgets

test('should related widgets with section', t => {
  const { node, defaultProps } = t.context
  
  const section1 = node.find(Section).at(0)
  const widgets = defaultProps.widgets.filter(w => {
    return w.sectionId === section1.props().section.id
  })

  t.is(section1.find(Widget).length, widgets.length)
})

test('should pass renderWidget to Widget component', t => {
  const { node, defaultProps } = t.context
  const renderWidget = ({ widget }) => (
    <p>
      {widget.kind}
    </p>
  )
  node.setProps({ renderWidget })

  const i = 1
  const widget1 = node.find(Section).at(i).find(Widget).at(0)
  
  const props = {
    widget: defaultProps.relationship(
      defaultProps.sections[i],
      defaultProps.widgets
    )[0]
  }
  
  t.deepEqual(
    widget1.props().renderWidget(props),
    renderWidget(props)
  )
})

// Footer tests

test('should custom footer render', t => {
  const { node } = t.context
  const Footer = () => <div />
  node.setProps({ renderFooter: () => <Footer /> })
  
  t.is(node.find(Footer).length, 1)
})
