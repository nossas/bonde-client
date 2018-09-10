import PropTypes from 'prop-types'
import styled from 'styled-components'

const DonationTypeBox = styled.div`
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-around;
  padding-top: 2rem;
`
const DonationTypeBoxItem = styled.div`
  cursor: pointer;
  font-size: .9rem;
  text-decoration: none;
  color: #b0b0b0;
  font-weight: bold;
  padding: 0.5rem 0;
  opacity: .4;
  
  ${props => props.active && 'opacity: .8;'}
`

const DonationTypeBoxIcon = styled.i`
  ${props => props.name === 'unique' && `
    background: 50% 50% url(https://s3-sa-east-1.amazonaws.com/bonde-assets/assets/images/donation-unique.png) transparent no-repeat;`}
  ${props => props.name === 'recurring' && `
    background: 50% 50% url(https://s3-sa-east-1.amazonaws.com/bonde-assets/assets/images/donation-recurring.png) transparent no-repeat;`} 
  background-size: contain;
  width: 2.2rem;
  height: 2.2rem;
  display: inline-block;
  margin: 0 auto 1.7em;
  display: block;
`

DonationTypeBoxIcon.propTypes = {
  name: PropTypes.oneOf(['recurring', 'unique']).isRequired
}

DonationTypeBox.Item = DonationTypeBoxItem
DonationTypeBox.Icon = DonationTypeBoxIcon

export default DonationTypeBox
