import styled from 'styled-components'

const Nav = styled.div`
  width: 100%;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 3;
  text-align: center;

  @media screen and (max-width: 1023px) {
    display: none;
  }
`

export default Nav
