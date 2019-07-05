import { toSnakeCase } from './utils'
import { expect } from 'chai'

describe('scenes > Logged > scenes > Home > utils', () => {
  it('should convert deep object to snake case keys', () => {
    const obj = {
      id: 1,
      createdAt: '2018-11-14T13:20:22.002167',
      updatedAt: '2018-11-20T14:06:05.213214',
      sharing: {
        fbLink: null,
        twitterLink: null,
        facebookAppId: null
      },
      emailTemplateFrom: 'Igor 9 Santos <igor@nossas.org>'
    }
    const expectedObj = {
      id: 1,
      created_at: '2018-11-14T13:20:22.002167',
      updated_at: '2018-11-20T14:06:05.213214',
      sharing: {
        fb_link: null,
        twitter_link: null,
        facebook_app_id: null
      },
      email_template_from: 'Igor 9 Santos <igor@nossas.org>'
    }

    expect(toSnakeCase(obj), expectedObj).to.deep.equal(expectedObj)
  })
})
