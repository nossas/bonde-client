import styled from 'styled-components'

const Form = styled.div`
  position: relative;
  background-color: ${(props) => props.bgColor};
  border-radius: 3px;
  padding: 2rem;
`

Form.defaultProps = {
  bgColor: 'rgba(0,0,0,0.25)'
}

export default Form
