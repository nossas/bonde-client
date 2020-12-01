import styled from 'styled-components';
import { Header } from 'bonde-components';

const Panel = styled.div`
  width: 100%;
  background-color: #fff;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 10px 20px -7px rgba(0,0,0,0.05);
  border-radius: 4px;
`;

export const Section = styled.div`
  padding: 0 0 20px;

  ${Header.H4}, ${Header.H3}, ${Header.H5} {
    padding-bottom: 12px;
  }

  button {
    margin: 12px 0 0;
  }

  ul {
    margin: 0 1em 0;
  }
`

export default Panel;