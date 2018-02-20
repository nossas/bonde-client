import React from 'react'
import styled from 'styled-components'
import Text from './Text'

const H1 = Text.withComponent('h1').extend`
  font-size: 44px !important;
  font-weight: 900 !important;
  line-height: 1.14 !important;
`

const H2 = Text.withComponent('h2').extend`
  font-size: 32px !important;
  font-weight: 900 !important;
  line-height: 1.12 !important;
`

const H3 = Text.withComponent('h3').extend`
  font-size: 21px !important;
  font-weight: 800 !important;
  line-height: 0.95 !important;
}`

export default { H1, H2, H3 }
