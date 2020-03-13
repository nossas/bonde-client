import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { IconColorful } from '../../content/IconColorful/IconColorful';

const FooterContent = styled.div`
  flex-grow: 1;
  padding: 0 0 0 84.7px;

  & a {
    font-family: 'Nunito Sans', sans-serif;
    font-size: 13px;
    font-weight: 800;
    text-transform: uppercase;
    text-decoration: none;
    margin-right: 35px;
    color: #fff;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Footer = styled(({ children, className }) => (
  // btnHelpLabel,
  // btnHelpClick
  <div className={className}>
    <IconColorful name="bonde" size={115} inverted />
    <FooterContent>{children}</FooterContent>
  </div>
))`
  ${props =>
    props.fixed &&
    `
    position: absolute;
    bottom: 0;
  `}
  display: flex;
  align-items: center;
  height: 94px;
  background: #000;
  padding: 0 150px;
  overflow: hidden;
  width: auto;
`;

const { oneOfType, node, func, string } = PropTypes;

Footer.propTypes = {
  /** The content of the footer. */
  children: oneOfType([node, func]),
  /** The help button label text. */
  btnHelpLabel: string,
  /** The help button onClick event handler function. */
  btnHelpClick: func,
};

Footer.displayName = 'Footer';

/** @component */
export default Footer;
