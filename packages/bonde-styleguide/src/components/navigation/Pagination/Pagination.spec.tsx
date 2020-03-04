import test from 'ava'
import React from 'react'
import { shallow } from 'enzyme'
import Pagination from './Pagination'

const { defaultProps } = Pagination

const excludePrevAndNextButtons = 2

test.beforeEach(t => {
  t.context.node = shallow(<Pagination onChangePage={i => i} />)
})

test('render first and last icon buttons', t => {
  const { node } = t.context
  t.is(node.find('IconButton').length, 2)
})

test('render 2 flat buttons by default', t => {
  const { node } = t.context
  t.is(node.find('FlatButton').length, 2)
})

test(`first icon button name should be ${defaultProps.iconFirst} by default`, t => {
  const { node } = t.context
  t.is(node.find('IconButton').get(0).props.name, defaultProps.iconFirst)
})

test(`last icon button name should be ${defaultProps.iconLast} by default`, t => {
  const { node } = t.context
  t.is(node.find('IconButton').get(1).props.name, defaultProps.iconLast)
})

test('first icon button should be disabled by default', t => {
  const { node } = t.context
  t.is(node.find('IconButton').get(0).props.disabled, true)
})

test('last icon button should be disabled by default', t => {
  const { node } = t.context
  t.is(node.find('IconButton').get(1).props.disabled, true)
})

test('prev button should be disabled by default', t => {
  const { node } = t.context
  t.is(node.find('FlatButton').get(0).props.disabled, true)
})

test('next button should be disabled by default', t => {
  const { node } = t.context
  t.is(node.find('FlatButton').get(1).props.disabled, true)
})

test('render input page', t => {
  const { node } = t.context
  t.is(node.find('InputPage').length, 1)
})

test('pass pages and pageIndex to InputPage', t => {
  const pages = 10
  const pageIndex = 2
  const { node } = t.context
  node.setProps({ pageIndex, pages })
  const inputPage = node.find('InputPage')
  
  t.is(inputPage.props().pageIndex, pageIndex)
  t.is(inputPage.props().pages, pages)
})

test('disable next button and last icon button when last page index was reached', t => {
  const pages = 5
  const pageIndex = pages - 1
  const { node } = t.context
  node.setProps({ pages, pageIndex })
  
  t.is(node.find('FlatButton').get(1).props.disabled, true)
  t.is(node.find('IconButton').get(1).props.disabled, true)
})

test('disable prev button and first icon button when first page index was reached', t => {
  const pages = 5
  const pageIndex = 0
  const { node } = t.context
  node.setProps({ pages, pageIndex })
  
  t.is(node.find('FlatButton').get(0).props.disabled, true)
  t.is(node.find('FlatButton').get(1).props.disabled, false)
  t.is(node.find('IconButton').get(0).props.disabled, true)
  t.is(node.find('IconButton').get(1).props.disabled, false)
})
