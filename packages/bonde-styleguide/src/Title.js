import React from 'react'
import styled from 'styled-components'

const H1 = styled.h1`{
  font-family: 'Nunito Sans', sans-serif;
  font-size: 44px;
  font-weight: 900;
  line-height: 1.14;
  color: #000;
}`

const H2 = styled.h2`{
  font-family: 'Nunito Sans', sans-serif;
  font-size: 32px;
  font-weight: 900;
  line-height: 1.12;
  color: #000;
}`

const H3 = styled.h3`{
  font-family: 'Nunito Sans', sans-serif;
  font-size: 21px;
  font-weight: 800;
  line-height: 0.95;
  color: ${props => props.color || '#000'};
}`

export default { H1, H2, H3 }
