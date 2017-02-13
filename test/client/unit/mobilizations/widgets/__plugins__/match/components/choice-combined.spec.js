import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

// Current module dependencies
import { ChoiceCombined } from '~widget-plugins/match/components'

describe('client/mobilizations/widgets/__plugins__/match/components/choice-combined', () => {
  let wrapper
  let props = {
    first_choice: 'ChoiceA',
    second_choice: 'ChoiceB',
    match: {},
    handleUploadFinish: () => {}
  }

  beforeEach(() => {
    wrapper = shallow(<ChoiceCombined {...props} />)
  })

  it('should update state with background image when upload finish', () => {
    wrapper.instance().handleUploadFinish({ signedUrl: 'foo.png?bar=fooz' })
    expect(wrapper.state()).to.deep.equal({
      uploadProgress: 'success',
      uploadFinished: true,
      bgImage: 'foo.png'
    })
  })
})
