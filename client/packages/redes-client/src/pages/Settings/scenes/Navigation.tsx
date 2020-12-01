import styled from "styled-components";
import { Theme as theme } from "bonde-components";

const Navigation = styled.div<{ theme: any }>`
  display: grid;
  grid-gap: 25px;
  height: 40px;
  align-items: center;
  margin-bottom: 25px;
  z-index: 1;
  position: relative;
  width: 50%;
  & a {
    color: ${({ theme }) => theme.brand.dark};
    font-weight: 800;
    font-family: ${({ theme }) => theme.fontFamily};
    text-decoration: none;
    cursor: pointer;
    &.active {
      color: ${({ theme }) => theme.brand.main};
    }
  }
`;

Navigation.defaultProps = {
  theme,
};

export default Navigation;
