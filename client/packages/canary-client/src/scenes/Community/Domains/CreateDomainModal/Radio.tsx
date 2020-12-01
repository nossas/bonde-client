import styled from 'styled-components';

const Radio = styled.label`
  display: flex;
  cursor: pointer;

  input {
    margin: 5px 10px 0 0;

    &:checked,
    &:not(:checked) {
      position: absolute;
      left: -9999px;
    }
    &:checked + p,
    &:not(:checked) + p
    {
      position: relative;
      padding-left: 28px;
      color: #666;
    }
    &:checked + p:before,
    &:not(:checked) + p:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 18px;
      height: 18px;
      border: 1px solid #ddd;
      border-radius: 100%;
      background: #fff;
    }
    &:checked + p:after,
    &:not(:checked) + p:after {
      content: '';
      width: 12px;
      height: 12px;
      background: #F87DA9;
      position: absolute;
      top: 3px;
      left: 3px;
      border-radius: 100%;
      -webkit-transition: all 0.2s ease;
      transition: all 0.2s ease;
    }
    &:not(:checked) + p:after {
      opacity: 0;
      -webkit-transform: scale(0);
      transform: scale(0);
    }
    &:checked + p:after {
      opacity: 1;
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }
`;

export default Radio;