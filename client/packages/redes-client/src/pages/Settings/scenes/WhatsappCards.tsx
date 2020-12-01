import styled from "styled-components";

const WhatsappCards = styled.div`
  display: grid;
  @media (min-width: 768px) {
    grid-column-gap: 30px;
    grid-template-columns: auto 30%;
  }
`;

export default WhatsappCards;
