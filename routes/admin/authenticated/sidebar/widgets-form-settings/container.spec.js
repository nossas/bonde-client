import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import Container from '~routes/admin/authenticated/sidebar/widgets-form-settings/container'

describe('routes/admin/authenticated/sidebar/widgets-form-settings/container', () => {
  const props = {
    mobilization: { id: 1, name: 'Lorem' },
    location: {},
    widget: { id: 2, kind: 'form', settings: {} },
    asyncWidgetUpdate: () => {}
  }

  it('should render without crashed', () => {
    const container = shallow(<Container {...props} />)
    expect(container).to.be.ok
  })

  it('should render children with props', () => {
    const Dummy = props => <h1>Dummy</h1>
    const container = shallow(<Container {...props}><Dummy /></Container>)
    expect(container.find('Dummy').props()).to.deep.equal(props)
  })
})
