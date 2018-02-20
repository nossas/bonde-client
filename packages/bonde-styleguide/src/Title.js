import React from 'react'
import styled from 'styled-components'
import Text from './Text'

const H1 = Text.withComponent('h1').extend`
  font-size: 44px;
  font-weight: 900;
  line-height: 1.14;
`

const H2 = Text.withComponent('h2').extend`
  font-size: 32px;
  font-weight: 900;
  line-height: 1.12;
`

const H3 = Text.withComponent('h3').extend`
  font-size: 21px;
  font-weight: 800;
  line-height: 0.95;
}`

export default { H1, H2, H3 }
