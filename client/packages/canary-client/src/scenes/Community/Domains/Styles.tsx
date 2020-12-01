import React from 'react';
import styled from 'styled-components';
import { Text, Header, Icon } from 'bonde-components';

export type ColProps = {
  align?: string
}

export const Col = styled.div<ColProps>`
  text-align: ${props => props.align};

  p {
    text-align: ${props => props.align};
  }

  ${Text} {
    word-break: break-all;
  }
`;

Col.defaultProps = {
  align: 'left'
}

export type DNSProps = {
  header?: boolean
}

export const DNS = styled.div<DNSProps>`
  display: grid;
  grid-template-columns: 500px auto 150px;
  grid-template-rows: ${props => !!props.header ? '35px' : '60px'};
  background-color: ${props => !!props.header ? 'none' : '#fff'};
  border-bottom: ${props => !!props.header ? 'none' : '1px solid #eee'};  

  ${Col} {
    padding: ${props => !!props.header ? '0 20px 18px' : '18px 20px'};

    ${Header.H5} {
      margin: 14px 0 8px;
    }
  }

  ${props => !!props.header && `
    p {
      text-transform: uppercase;
      font-size: 13px;
      font-weight: 700;
    }
  `}
`

export type StatusProps = {
  value?: string
  labels: Record<string, string>
  activeStatus?: string
  inactiveStatus?: string
  isActived?: () => boolean
}

type StatusStyledProps = {
  active?: boolean
  disabled?: boolean
}

// Status propagando: #444444
export const StatusStyled = styled(Text).attrs({ bold: true, uppercase: true })`
  font-size: 13px !important;
  color: ${(props: StatusStyledProps) => props.active ? '#50E3C2' : props.disabled ? '#FF2B4E' : '#444444'} !important;

  svg {
    margin: 0 5px 3px 0;

    g, path {
      fill: ${(props: StatusStyledProps) => props.active ? '#50E3C2' : props.disabled ? '#FF2B4E' : '#444444'} !important;
    }
  }
`;

export const Status = ({ value, labels, activeStatus, inactiveStatus, isActived }: StatusProps) => {
  const isActive = !!isActived ? isActived() : value === activeStatus;
  const isDisabled = !!isActived ? !isActived() : value === inactiveStatus;

  return (
    <StatusStyled active={isActive} disabled={isDisabled}>
      {isActive ? (
        <>
          <Icon size='small' name='Check' />
          <span>{labels[value || 'active']}</span>
        </>
      ) : inactiveStatus ? (
        <>
          <Icon size='small' name='Warning' />
          <span>{labels[value || 'inactive']}</span>
        </>
      ) : (
        <>
          <Icon size='small' name='Sync' />
          <span>{labels[value || '']}</span>
        </>
      )}
    </StatusStyled>
  );
}

Status.defaultProps = {
  activeStatus: 'active'
}

type ListProps = {
  columnSize?: string
  rowSize?: string
  padding?: string
}

export const List = styled.div<ListProps>`
  padding: 18px 0 30px;

  a {
    text-decoration: none;
  }

  ${DNS} {
    grid-template-columns: ${props => !props.columnSize ? '500px auto 150px' : props.columnSize};

    ${props => props.rowSize && `
      grid-template-rows: ${props.rowSize};
    `};

    ${props => props.padding && `
      ${Col} {
        padding: ${props.padding};
      }
    `};
  }
`

export const MainTitle = styled(Text).attrs({ uppercase: true })`
  display: flex;
  font-size: 13px;
  font-weight: 600;
`;

export const SmallText = styled(Text)`
  font-size: 13px;
  text-align: center;
  margin-bottom: 10px;

  a {
    color: #ee0099;

    &:hover {
      color: #e2058a
    }
  }
`;

export const Button = styled.button.attrs({ type: 'button' })`
  font-family: Nunito Sans;
  font-size: 13px;
  border: none;
  outline: none;
  text-transform: uppercase;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    color: #c7c7c7;

    svg {
      path {
        fill: #c7c7c7;
      }
    }
  }

  svg {
    margin: 0 5px 3px 0;
  }
`;

export const Fluid = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: middle;

  button {
    max-height: 35px;
    max-width: 250px;
    padding: 8px 24px;
  }

  h3 {
    font-size: 21px;
    line-height: 28.6px;
    margin-bottom: 6px !important;
  }

  p {
    line-height: 27px;
  }

  a {
    text-decoration: none;

    &:hover {

      svg {
        path {
          fill: #c7c7c7;
        }
      }

      h5 {
        color: #c7c7c7;
      }
    }
  }
`