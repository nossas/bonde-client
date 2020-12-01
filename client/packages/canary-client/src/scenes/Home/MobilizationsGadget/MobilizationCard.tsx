import React from 'react';
import styled from 'styled-components';
import { Header, Text } from 'bonde-components';
import Image from './Image';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  box-shadow: 0 20px 40px -14px rgba(0,0,0,0.25);
  overflow: hidden;
  width: 100%;
  cursor: pointer;

  &:hover {
    img, svg {
      filter: contrast(100%);
    }
  }
`;

const CardContent = styled.div`
  padding: 18px;
`;

export type Mobilization = {
  id: number
  name: string
  goal?: string
  facebookShareImage?: string
  customDomain?: string
  slug: string
  community: any
}

type Props = {
  className?: string
  mobilization: Mobilization
  onClick?: any
}

const MobilizationCard = styled(({ className, mobilization, onClick }: Props) => {
  return (
    <div className={className} onClick={onClick}>
      <Card>
        <Image src={mobilization.facebookShareImage} title={mobilization.name} />
        <CardContent>
          <Header.H4>{mobilization.name}</Header.H4>
          <Text>Por {mobilization.community.name}</Text>
        </CardContent>
      </Card>
    </div>
  )
})`
  display: flex;
  flex-basis: 50%;

  @media only screen and (max-width: 768px) {
    flex-basis: 100%;
  }
`;

export default MobilizationCard;
