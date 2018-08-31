import styled from 'styled-components'

const Background = styled.div`
  height: 500px;

  ${props => props.bgImage && `
    background: url(${props.bgImage}) no-repeat;
    background-size: cover;
  `}
`

export default Background
