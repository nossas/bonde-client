import React from 'react'
import styled from 'styled-components'

const BrickComponent = ({ className, text }) => (
  <div className={className}>
    {text}
  </div>
)

const Brick = styled(BrickComponent)`
  background: purple;
  border-radius: 3px;
  box-shadow: inset 0 0 0 5px rgba(0,0,0,.5);
  padding: 15px 0;
  display: flex;
  font-size: .7rem;
  font-family: Nunito Sans;
  font-weight: 300;
  justify-content: center;
  align-items: center;
  color: #FFFFFF;
`

/* @component */
export default Brick
