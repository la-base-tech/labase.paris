import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Logo from './Logo';
import Link from './Link';

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
  @media (min-width: ${({ theme }) => theme.breakpointDesktop}) {
    align-items: stretch;
    display: flex;
    flex-shrink: 0;
    width: 100%;
    max-width: 1024px;
    margin: auto;
  }
`;

const NavBarBrandStyled = styled.div`
  width: 100%;
  padding: 0 0.75rem;

  @media (min-width: ${({ theme }) => theme.breakpointDesktop}) {
    width: auto;
  }
`;

const NavBarMenuStyled = styled.div`
  padding: 0 0.75rem;

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

const ButtonStyled = styled(Link)`
  font-weight: bold;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
`;

const Navbar = ({ currentPath }) => {
  return (
    <NavBarStyled id="navbar" className="navbar is-fixed-top">
      <NavBarContentStyled>
        <NavBarBrandStyled className={`navbar-brand}`}>
          <Link className="navbar-item" href="/">
            <LogoStyled />
          </Link>
        </NavBarBrandStyled>

        <NavBarMenuStyled className="navbar-menu">
          <div className="navbar-end is-hidden-touch">
            <div className="navbar-item">
              <div className="buttons">
                {currentPath !== '/don/' && (
                  <ButtonStyled className="button is-primary" href="/don/">
                    Crowdfunding
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
              </div>
            </div>
          </div>
        </NavBarMenuStyled>
      </NavBarContentStyled>
    </NavBarStyled>
  );
};

Navbar.propTypes = {
  currentPath: PropTypes.string.isRequired,
};

export default Navbar;
