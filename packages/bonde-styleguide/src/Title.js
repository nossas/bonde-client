import React from 'react'
import styled from 'styled-components'
import Text from './Text'

const H1 = Text.withComponent('h1').extend`
  font-size: 44px !important;
  font-weight: 900 !important;
  line-height: 1.14 !important;
`

H1.displayName = 'Title.H1'

const H2 = Text.withComponent('h2').extend`
  font-size: 32px !important;
  font-weight: 900 !important;
  line-height: 1.12 !important;
`

H2.displayName = 'Title.H2'

const H3 = Text.withComponent('h3').extend`
  font-size: 21px !important;
  font-weight: 800 !important;
  line-height: 0.95 !important;
}`

H3.displayName = 'Title.H3'

export default { H1, H2, H3 }
