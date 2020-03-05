import styled from 'styled-components';

const Header = styled.div`
  position: relative;
  ${props => props.minHeight && `min-height: 80px;`}
  background: #000;
  padding: 22px 60px;
  z-index: 1;
`;

Header.displayName = 'Header';

/** @component */
export default Header;
