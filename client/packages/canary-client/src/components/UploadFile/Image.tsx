import React from 'react';
import styled from 'styled-components';
import EditImageIcon from './EditImageIcon';

const ImageStyled = styled.div`
  position: relative;

  img {
    width: 83px;
    height: 83px;
    border-radius: 50%;

    &:focus {
      outline: none;
      border: none;
    }
  }

  svg {
    position: absolute;
    bottom: 3px;
    right: 0;
  }
`

const Image = ({ src, alt }: any) => (
  <ImageStyled>
    <img src={src} alt={alt} />
    <EditImageIcon />
  </ImageStyled>
)

export default Image;