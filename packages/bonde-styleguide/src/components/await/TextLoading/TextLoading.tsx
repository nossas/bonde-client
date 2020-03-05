import React from 'react';

import { Flexbox2 as Flexbox, Loading, Text, Title } from '../../..';

interface Props {
  message: string;
}

const TextLoading = ({ message }: Props) => (
  <Flexbox vertical middle>
    <Text align="center" margin={{ top: '20vh' }}>
      <Loading size={109} sparklesDuration="3s" />
    </Text>
    {message && <Title.H3 align="center">{message}</Title.H3>}
  </Flexbox>
);

export default TextLoading;
