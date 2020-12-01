import styled from 'styled-components';
import { Row } from 'bonde-components';

const Content = styled.div`
  display: flex;
  flex-grow: 1;
  padding: 20px 60px;

  ${Row} {
    flex-grow: 1;
  }
`;

export default Content;
