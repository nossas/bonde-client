import React from 'react'
import { mount } from 'enzyme'
import { StaticRouter } from 'react-router-dom'
import Route from './Route'
import { expect } from 'chai'

describe('services > auth > components', () => {
  const props = {
    component: () => (<p id='testComponent'>Test Render</p>),
    redirectTo: '/login'
  }

  it('render component when assert is true', () => {
    const context = {}
    const node = mount(
      <StaticRouter context={context}>
        <Route {...props} assert={true} />
      </StaticRouter>
    )

    expect(node.find('#testComponent')).to.be.lengthOf(1)
    expect(context.action, undefined).to.be.undefined
    expect(context.url, undefined).to.be.undefined
  })

  it('render redirect when assert if false', () => {
    const context = {}
    const node = mount(
      <StaticRouter context={context}>
        <Route {...props} assert={false} />
      </StaticRouter>
    )

    expect(context.action).to.be.equal('REPLACE')
    expect(context.url).to.be.equal(props.redirectTo)
  })

  it('render component when assert false and redirectTo undefined', () => {
    const context = {}
    const node = mount(
      <StaticRouter context={context}>
        <Route {...props} assert={false} redirectTo={undefined} />
      </StaticRouter>
    )

    expect(node.find('#testComponent')).to.be.lengthOf(1)
    expect(context.action).to.be.undefined
    expect(context.url).to.be.undefined
  })
})
