import expect from 'expect'
import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'

import { Button } from '../src'

describe('Button', () => {
  let node

  beforeEach(() => {
    node = document.createElement('div')
  })

  afterEach(() => {
    unmountComponentAtNode(node)
  })

  it('should render properly', () => {
    render(<Button>Primary</Button>, node, () => {
      expect(node.innerHTML).toContain('button')
    })
  })
})
