import React from "react";
import styled from "styled-components";
import { Empty, Header } from "bonde-components";
import { CommunityMenu } from "bonde-core-tools";

type StylesProps = {
  height?: string;
};

const Styles = styled.div<StylesProps>`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  height: ${(props) => props.height};
  min-height: ${(props) => props.height};
  overflow-y: auto;

  ul {
    margin: 0;
    padding: 0;

    li {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    li.mobile {
      cursor: pointer;

      &:hover {
        background-color: #c7c7c7;
      }
    }
  }

  &::-webkit-scrollbar {
    width: 33px;
  }
  &::-webkit-scrollbar-thumb {
    background-clip: padding-box;
    background-color: rgba(74, 74, 74, 0.75);
    border-width: 20px 15px;
    border-style: solid;
    border-color: transparent;
    border-image: initial;
  }
`;

Styles.defaultProps = {
  height: "535px",
};

type ColumnProps = {
  grow?: number | string;
  mobile?: string;
};

const Colunm = styled.div<ColumnProps>`
  ${(props) => props.grow && `flex-grow: ${props.grow};`}
  padding: 13px 15px 14px;

  ${Header.H4}, ${Header.H5} {
    margin: 0;
  }

  @media only screen and (max-width: 768px) {
    ${(props) =>
      props.mobile === "hide" &&
      `
      display: none;
    `};
  } ;
`;

const Image = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 30px;
`;

type Props = {
  communities: any[];
};

const CommunitiesScrollBox = ({ communities }: Props) => {
  const isMobile = window.innerWidth <= 768;
  const itemProps: any = {};
  if (isMobile) {
    itemProps.className = "mobile";
    // itemProps.onClick = () => { console.log('click item') }
  }

  return (
    <Styles>
      {communities.length > 0 ? (
        <ul>
          {communities.map((c, index) => (
            <li key={index} {...itemProps}>
              <Colunm>
                <Image
                  src={
                    c.image ||
                    `https://via.placeholder.com/100?text=${c.name.substring(
                      0,
                      1
                    )}`
                  }
                  alt={c.name}
                />
              </Colunm>
              <Colunm grow={1}>
                <Header.H4>{c.name}</Header.H4>
                <Header.H6>{c.description || c.city}</Header.H6>
              </Colunm>
              <Colunm mobile="hide">
                <CommunityMenu community={c} />
              </Colunm>
            </li>
          ))}
        </ul>
      ) : (
        <Empty message="Nenhuma comunidade encontrada" />
      )}
    </Styles>
  );
};

CommunitiesScrollBox.defaultProps = {
  communities: [],
};

export default CommunitiesScrollBox;
