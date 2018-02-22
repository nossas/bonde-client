import expect from 'expect'
import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'

import { Title } from '../src'

describe('Title', () => {
  let node

  beforeEach(() => {
    node = document.createElement('div')
  })

  afterEach(() => {
    unmountComponentAtNode(node)
  })

  it('should render H1 title properly', () => {
    render(<Title.H1>Título</Title.H1>, node, () => {
      expect(node.innerHTML).toContain('h1')
    })
  })

  it('should render H2 title properly', () => {
    render(<Title.H2>Título</Title.H2>, node, () => {
      expect(node.innerHTML).toContain('h2')
    })
  })

  it('should render H3 title properly', () => {
    render(<Title.H3>Título</Title.H3>, node, () => {
      expect(node.innerHTML).toContain('h3')
    })
  })
})
