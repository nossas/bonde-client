import styled from 'styled-components'

const Background = styled.div`
  min-height: 500px;

  ${props => props.bgImage && `
    background: url(${props.bgImage}) no-repeat;
    background-size: cover;
  `}
  ${props => props.bgColor && `
    background-color: ${props.bgColor}; 
  `}
`

export default Background
