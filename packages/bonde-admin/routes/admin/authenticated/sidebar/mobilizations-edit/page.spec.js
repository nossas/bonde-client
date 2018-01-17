import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import Mobilization from '~client/mobrender/components/mobilization.connected'
import { Loading } from '~client/components/await'
import Page from '~routes/admin/authenticated/sidebar/mobilizations-edit/page'

describe('routes/admin/authenticated/sidebar/mobilizations-edit/page', () => {
  let page
  const defaultProps = {
    mobilization: {},
    match: {}
  }

  beforeEach(() => {
    page = shallow(<Page {...defaultProps} />)
  })

  it('should render without crashed', () => {
    // eslint-disable-next-line no-unused-expressions
    expect(page).to.be.ok
  })

  it('should render mobilization with editable true', () => {
    expect(page.find(Mobilization).props())
      .to.have.property('editable')
      .that.is.a('boolean')
      .that.equals(true)
  })

  it('should render loading when renderIsLoading is true', () => {
    page.setProps({ renderIsLoading: true })
    expect(page.find(Loading).length).to.equal(1)
  })
})
