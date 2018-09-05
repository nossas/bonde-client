import test from 'ava'
import React from 'react'
import { shallow } from 'enzyme'
import Background from './Background'
import SectionRow from './'
import Row from './Row'

test.beforeEach(t => {
  t.context.defaultProps = {
    children: <p>About</p>,
    section: {}
  }
  t.context.node = shallow(<SectionRow {...t.context.defaultProps} />)
})

test('should render Background with section.bgImage', t => {
  const { node } = t.context
  const bgImage = 'http://link.me'
  node.setProps({ section: { bgImage } })
  
  const bgProps = node.find(Background).props()
  t.is(bgProps.bgImage, bgImage)
})

test('should render children inside Row', t => {
  const { node } = t.context
  const row = node.find(Row)

  t.is(row.find('p').length, 1)
})

test('should pass bgClass like bgColor when is rgba', t => {
 const { node } = t.context
 const bgClass = '{"r":255,"g":238,"b":162,"a":1}'
 node.setProps({  section: { bgClass } })

 const rgba = JSON.parse(bgClass)
 const bgProps = node.find(Background).props()
 t.is(bgProps.bgColor, `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`)
})

test('should pass only bgImage when bgImage and bgColor exists', t => {
  const { node } = t.context
  node.setProps({
    section: { bgImage: 'http://image.link', bgClass: 'my-theme-bg1' }
  })

  const bgProps = node.find(Background).props()
  t.is(bgProps.bgColor, undefined)
  t.true(bgProps.bgImage !== undefined)
})
