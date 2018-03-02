import styled from 'styled-components'

const Input = styled.input`{
  font-family: 'Nunito Sans', sans-serif;
  font-size: 16px;
  color: #000;
  border: none;
  border-bottom: 1px solid;
  border-color: ${props => props.invalid ? '#ff0931' : '#ccc'};
  padding: 8px 0;
  background: none;

  &:focus {
    outline: none;
    border-bottom: 1px solid #ee0099;
  }
  &[disabled] {
    color: #d1cdd2;
    background: none;
  }
}`

/* @component */
export default Input
