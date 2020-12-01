import React from "react";
import { Header, Text } from "bonde-components";
import styled from "styled-components";

const WrapButtons = styled.div<{ direction?: 'column' | 'row' }>`
  display: grid;
  ${({ direction }) => direction === 'row' && `
    grid-template-columns: auto auto;
    justify-content: space-between;
    align-items: center;
  `}
`;

WrapButtons.defaultProps = {
  direction: 'row'
}

const Wrap = styled.div`
  & > ${Header.H2} {
    margin: 0;
  }
`;

export default function Default({
  title,
  text,
  MainBtn,
  SecondaryBtn,
  direction
}: {
  title: string;
  text: string;
  MainBtn: React.ReactNode;
  SecondaryBtn: React.ReactNode;
  direction?: 'column' | 'row';
}): React.ReactElement {
  return (
    <Wrap>
      <Header.H2>{title}</Header.H2>
      <Text>{text}</Text>
      <WrapButtons direction={direction}>
        {SecondaryBtn}
        {MainBtn}
      </WrapButtons>
    </Wrap>
  );
}
