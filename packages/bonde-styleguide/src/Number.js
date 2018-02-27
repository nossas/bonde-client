import React from 'react'
import Text from './Text'


const TextNumber = Text.extend`
  font-size: 32px !important;
  font-weight: 900 !important;
  margin: 0;
  display: flex;
  justify-content: space-between;
`

const Number = ({ value, icon: Icon }) => (
  <TextNumber>
    <span>{value}</span>
    {Icon && <Icon />}
  </TextNumber>
)

Number.displayName = 'Number'

export default Number
