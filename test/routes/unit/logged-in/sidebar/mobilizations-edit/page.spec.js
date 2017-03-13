import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import Mobilization from '~client/mobrender/components/mobilization.connected'
import { Loading } from '~components/await'
import Page from '~routes/authenticated/sidebar/mobilizations-edit/page'

describe('routes/application/mobilizations-edit/page', () => {
  let page
  const defaultProps = {
    mobilization: {}
  }
  const context = { router: {} }

  beforeEach(() => {
    page = shallow(<Page {...defaultProps} />, { context })
  })

  it('should render without crashed', () => {
    expect(page).to.be.ok
  })

  it('should render mobilization with editable true', () => {
    expect(page.find(Mobilization).props()).to.deep.equal({ editable: true })
  })

  it('should render loading when renderIsLoading is true', () => {
    page.setProps({ renderIsLoading: true })
    expect(page.find(Loading).length).to.equal(1)
  })
})
