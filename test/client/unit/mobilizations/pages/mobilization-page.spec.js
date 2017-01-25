import React from 'react'
import { shallow } from 'enzyme'

import { MobilizationPage } from '~mobilizations/pages/mobilization-page'

describe('client/mobilizations/pages/mobilization-page', () => {
  const defaultProps = { mobilization: {} }
  const context = { router: {} }

  it('should render without crashed', () => {
    shallow(<MobilizationPage {...defaultProps} />, { context })
  })
})
