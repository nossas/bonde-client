import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

//
// Size and Spacing variables
//
const vars = {
  avatarSize: '40px',
  padding: '18px',
  textGap: '23px'
}

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-x: hidden;
  text-overflow: ellipsis;
`

const Avatar = styled.div`
  background-color: #CCCCCC;
  background-size: cover;
  background-position: center center;
  border-radius: 50%;
  position: absolute;
  background-image: url(${({ image }) => image || ''});
  width: ${vars.avatarSize};
  height: ${vars.avatarSize};
  left: ${vars.padding};
  top: ${vars.padding};

  ${({ noavatar }) => noavatar && `
    display: none;
  `}

  ${({ image, label }) => !image && `
    &:before {
      content: '${label.slice(0, 1).toUpperCase()}';
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      font-weight: 900;
      color: #FFFFFF;
    }
  `}
`

const Label = styled.div.attrs({
  title: props => props.label
})`
  ${({ noavatar }) => !noavatar && `
    margin-left: ${vars.textGap};
  `}
  height: calc(${vars.avatarSize} / 2);
  font-family: Nunito Sans;
  line-height: 1.35;
  font-size: 16px;
  font-weight: 900;
  color: #000000;

  & > div {
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
  }
`

const Description = Label.extend.attrs({
  title: props => props.description
})`
  font-weight: 400;
  font-size: 13px;
  display: flex;
  align-items: flex-end;
  color: #4a4a4a;
  line-height: 1;
`

const Item = ({ className, href, ...props }) => (
  <li className={className}>
    <Avatar {...props} />
    <Label {...props}>
      <div>{props.label}</div>
    </Label>
    <Description {...props}>
      <div>{props.description}</div>
    </Description>
  </li>
)

List.Item = styled(Item)`
  position: relative;
  padding: ${vars.padding};

  ${({ noavatar }) => !noavatar && `
    padding-left: calc(${vars.padding} + ${vars.avatarSize});
  `}
`

const { string, bool } = PropTypes

List.Item.propTypes = {
  label: string.isRequired,
  description: string.isRequired,
  noavatar: bool
}

export default List
