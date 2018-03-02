import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Icon from '../../content/Icon/Icon'

const NavContainer = styled.div`{
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
}`

const Navbar = styled(({
  children,
  className,
  homePageUrl,
  homePageTitle,
  homePageIcon: HomePageIcon
}) => (
  <div className={className}>
    {HomePageIcon && (
      <a className='homePageLink' href={homePageUrl || '#'} title={homePageTitle}>
        <HomePageIcon size={16} />
      </a>
    )}
    <NavContainer>
      {children}
    </NavContainer>
  </div>
))`{
  background-color: ${props => props.bgColor || '#000'};
  width: inherit;
  height: 50px;
  display: flex;
  align-items: center;

  & > a.homePageLink {
    margin-right: 15px;
  }
}`

const { oneOfType, node, func, string } = PropTypes

Navbar.propTypes = {
  /** The home page URL. */
  homePageUrl: string,
  /** The home page title. */
  homePageTitle: string,
  /** The home page icon. */
  homePageIcon: oneOfType([node, func])
}

Navbar.defaultProps = {
  homePageIcon: () => <Icon name='bonde' />
}

/* @component */
export default Navbar
