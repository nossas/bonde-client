import React from 'react'
import { shallow } from 'enzyme'

import MobilizationsEditPage from '~routes/application/mobilizations-edit/page'

describe('routes/application/mobilizations-edit/page', () => {
  const defaultProps = { mobilization: {} }
  const context = { router: {} }

  it('should render without crashed', () => {
    shallow(<MobilizationsEditPage {...defaultProps} />, { context })
  })
})
