import React from 'react'
import styled from 'styled-components'
import { AngleDown, AngleRight } from '../Icon'

export const Item = styled.a`{
  width: auto;
  display: block;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 13px;
  font-weight: bold;
  font-stretch: normal;
  line-height: 1.54;
  letter-spacing: normal;
  text-align: left;
  color: #000000;
  text-decoration: none;
  padding: 10px 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: start;

  & > svg, & > i {
    margin-right: 15px;
  }
}`

export const Header = styled.div`{
  width: auto;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 16px;
  font-weight: 900;
  color: #000;
  display: flex;
  align-items: center;
  padding: 0 20px;
  justify-content: flex-start;

  & > img {
    margin-right: 15px;
  }
}`

const DropdownMenu = styled.div`{
  background-color: #fff;
  padding: 20px 0;
  margin-top: 15px;
  width: inherit;
  position: absolute;
 
  &::before {
    content: '';
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 8px solid #fff;
    position: absolute;
    top: -8px;
    right: 8px;
  }
}`

const Dropdown = styled.div`{
  position: relative;
  width: ${props => props.width ? `${props.width}px` : 'auto'};
  
  &  button {
    cursor: pointer;
    color: #fff;
    font-family: 'Nunito Sans', sans-serif;
    font-size: 13px;
    font-weight: 800;
    text-transform: uppercase;
    background: none;
    border: none;
    width: inherit;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &:active, &:focus {
      border:none;
      outline: none;
    }
  }

  & button span {
    margin: 0 10px 0 0;
    line-height: 1.15;
    letter-spacing: 0.5px;
  }
}`

const Flexbox = styled.div`{
  width: inherit;
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  align-items: center;

  & > svg {
    margin-right: 15px;
  }
}`



export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = { show: false }
  }

  toggleMenu () {
    this.setState({ show: !this.state.show })
  }

  render () {
    const { children, label, icon: Icon, width } = this.props
    const { show } = this.state
    return (
      <Dropdown width={width}>
        <Flexbox>
          {Icon && <Icon size={16} color='#fff' />}
          <button type='button' onClick={this.toggleMenu.bind(this)}> 
            <span>{this.props.label}</span>
            {show ? <AngleRight color='#fff' /> : <AngleDown color='#fff' />}
          </button>
        </Flexbox>
        {show && (<DropdownMenu>{children}</DropdownMenu>)}
      </Dropdown>
    )
  }
}
