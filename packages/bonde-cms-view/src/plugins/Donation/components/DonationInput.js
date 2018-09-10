import styled from 'styled-components'

const DonationInput = styled.div`
  background-color: rgba(0,0,0,0.0625);
  border-radius: .3rem;
  box-sizing: border-box;
  border: .3rem solid #fff;
  cursor: pointer;
  padding: 0.5rem 0;
  opacity: 0.8;
  
  color: #b0b0b0;
  font-weight: bold;
  text-align: center;

  &:hover {
    opacity: 1;
  }

  ${props => props.active && props.mainColor && `
    color: ${props.mainColor};
    border: .3rem solid ${props.mainColor};
  `}
`

export default DonationInput
