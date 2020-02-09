import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Logo from '../Logo';
import Link from '../Link';
import NavbarContext from './Context';
import NavbarProvider from './Provider';

export { NavbarContext as Context };
export { NavbarProvider as Provider };

const LogoStyled = styled(Logo)`
  color: ${props => props.theme.white};
  font-size: 2rem;
`;

const NavBarItemStyled = styled(Link)`
  font-weight: 300;
`;

const NavBarStyled = styled.nav`
  @media (max-width: ${props => props.theme.breakpointDesktop}) {
    &.is-expanded {
      background-color: ${props => props.theme.yellow};

      ${LogoStyled} {
        transition: color 0.2s ease;
        color: ${props => props.theme.black};
      }

      ${NavBarItemStyled} {
        color: ${props => props.theme.black};
        text-align: left;
        font-weight: bold;
      }
    }
  }
`;

const NavBarContentStyled = styled.div`
  align-items: stretch;
  display: flex;
  flex-shrink: 0;
  width: 100%;
  max-width: 1024px;
  margin: auto;
`;

const NavBarBrandStyled = styled.div`
  width: auto;
  padding: 0 0.75rem;
`;

const NavBarMenuStyled = styled.div`
  padding: 0 0.75rem;
  display: flex;
  align-items: stretch;
  flex-grow: 1;
  flex-shrink: 0;

  @media (max-width: ${props => props.theme.breakpointDesktop}) {
    &.is-active {
      box-shadow: none;
      background-color: ${props => props.theme.yellow};
      position: fixed;
      height: 100vh;
      width: 100%;
      text-align: center;
      padding-top: 3rem;
    }
  }
`;

const NavbarEndStyled = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: flex-end;
  margin-left: auto;
`;

const NavbarItemStyled = styled.div`
  align-items: center;
  display: none;

  &.is-visible {
    display: flex;
  }
`;

const ButtonStyled = styled(Link)`
  font-weight: bold;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
`;

const Navbar = ({ currentPath }) => {
  const { buttonVisible } = useContext(NavbarContext);

  return (
    <NavBarStyled id="navbar" className="navbar is-fixed-top">
      <NavBarContentStyled>
        <NavBarBrandStyled className="navbar-brand">
          <Link className="navbar-item is-paddingless" href="/">
            <LogoStyled />
          </Link>
        </NavBarBrandStyled>

        <NavBarMenuStyled className="navbar-menu">
          <NavbarEndStyled className="navbar-end">
            <NavbarItemStyled
              className={`navbar-item is-paddingless ${
                buttonVisible ? 'is-visible' : ''
              }`}
            >
              {currentPath !== '/don/' && (
                <ButtonStyled className="button is-primary" href="/don/">
                  Je donne
                </ButtonStyled>
              )}
              {currentPath === '/don/' && (
                <ButtonStyled
                  className="button is-primary"
                  href="#form"
                  targetMiddle
                >
                  Je donne
                </ButtonStyled>
              )}
            </NavbarItemStyled>
          </NavbarEndStyled>
        </NavBarMenuStyled>
      </NavBarContentStyled>
    </NavBarStyled>
  );
};

Navbar.propTypes = {
  currentPath: PropTypes.string.isRequired,
};

export default Navbar;
