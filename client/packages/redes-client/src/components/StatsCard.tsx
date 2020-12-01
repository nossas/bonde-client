import { Header, Text, CleanButton } from "bonde-components";
import styled from "styled-components";

const StatsCard = styled(CleanButton)`
  display: flex;
  flex-direction: column;
  width: 200px;
  align-items: center;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  background-color: #fff;
  justify-content: center;
  padding: 10px;
  flex-grow: 1;
  cursor: pointer;
  & > ${Header.H2} {
    margin: 0;
  }
  & > ${Text} {
    text-align: center;
    margin: 0;
  }
`;

export default StatsCard;
