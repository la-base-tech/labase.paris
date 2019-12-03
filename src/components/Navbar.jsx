import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeContext } from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';
import Logo from './Logo';
import Link from './Link';
import SocialNetworks from './SocialNetworks';

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

const NavBarStartStyled = styled.div`
  @media (min-width: ${({ theme }) => theme.breakpointDesktop}) {
    flex-grow: 1;
    justify-content: center;
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

const NavBarBurgerStyled = styled.div`
  width: calc(1.5rem + 16px);
  -webkit-tap-highlight-color: transparent;

  > span {
    left: auto !important;
    right: 0.75rem;
  }

  &:hover {
    background-color: transparent;
  }

  &:focus {
    outline: none;
  }

  &.is-active {
    color: ${props => props.theme.black} !important;
  }
`;

const SocialNetworksContainerStyled = styled.div`
  margin-top: 2rem;
  padding-left: 0.75rem;
`;

const SocialNetworksTitleStyled = styled.div`
  color: ${props => props.theme.black};
  font-weight: bold;
  cursor: default;
`;

const SocialNetworksStyled = styled(SocialNetworks)`
  margin-top: 1rem;
`;

const Navbar = ({ items, button, socialNetworks }) => {
  const theme = useContext(ThemeContext);
  const [navbarMenuActive, setNavbarActive] = useState(false);

  if (typeof document !== 'undefined') {
    const htmlEl = document.querySelector('html');
    // Disable scroll when the menu is active
    if (navbarMenuActive) {
      htmlEl.style.overflow = 'hidden';
    } else {
      htmlEl.style.overflow = '';
    }
  }

  if (typeof window !== 'undefined') {
    // Extract desktop breakpoint from theme
    const breakpointDesktop = Number.parseInt(
      theme.breakpointDesktop.replace('px', ''),
      10
    );

    // Disable menu when the window is resizing
    useEffect(() => {
      const handleResize = () => {
        const windowWidth = window.innerWidth;
        if (navbarMenuActive && windowWidth > breakpointDesktop) {
          setNavbarActive(false);
        }
      };
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    });
  }

  return (
    <NavBarStyled
      id="navbar"
      className={`navbar is-fixed-top ${navbarMenuActive ? 'is-expanded' : ''}`}
    >
      <NavBarContentStyled>
        <NavBarBrandStyled
          className={`navbar-brand ${navbarMenuActive ? 'is-expanded' : ''}`}
        >
          <Link
            className="navbar-item"
            href="/"
            onClick={() => setNavbarActive(false)}
          >
            <LogoStyled />
          </Link>
          <NavBarBurgerStyled
            className={`navbar-burger burger is-transparent has-text-white ${
              navbarMenuActive ? 'is-active' : ''
            }`}
            onClick={() => setNavbarActive(!navbarMenuActive)}
          >
            <span />
            <span />
            <span />
          </NavBarBurgerStyled>
        </NavBarBrandStyled>

        <NavBarMenuStyled
          className={`${navbarMenuActive ? 'is-active' : ''} navbar-menu`}
        >
          <NavBarStartStyled className="navbar-start">
            {items &&
              items.map(item => (
                <NavBarItemStyled
                  className="navbar-item"
                  href={item.url}
                  key={item.title}
                  onClick={() => setNavbarActive(false)}
                >
                  <div
                    className={`${
                      item.mobileOnly || item.titleMobile
                        ? 'is-hidden-touch'
                        : ''
                    }`}
                  >
                    {item.title}
                  </div>
                  {(item.mobileOnly || item.titleMobile) && (
                    <div className="is-hidden-desktop">
                      {item.titleMobile || item.title}
                    </div>
                  )}
                </NavBarItemStyled>
              ))}
          </NavBarStartStyled>

          <SocialNetworksContainerStyled className="is-hidden-desktop has-text-left">
            <SocialNetworksTitleStyled>
              {socialNetworks.title}
            </SocialNetworksTitleStyled>
            <SocialNetworksStyled
              items={socialNetworks.items}
              colorReversed
              onClick={() => setNavbarActive(false)}
            />
          </SocialNetworksContainerStyled>

          <div className="navbar-end is-hidden-touch">
            <div className="navbar-item">
              <div className="buttons">
                <ButtonStyled className="button is-primary" href={button.url}>
                  {button.title}
                </ButtonStyled>
              </div>
            </div>
          </div>
        </NavBarMenuStyled>
      </NavBarContentStyled>
    </NavBarStyled>
  );
};

Navbar.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      titleMobile: PropTypes.string,
      url: PropTypes.string.isRequired,
      mobileOnly: PropTypes.bool,
    })
  ).isRequired,
  button: PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  socialNetworks: PropTypes.shape({
    title: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default function NavbarWrapper(props) {
  return (
    <StaticQuery
      query={graphql`
        query {
          content: markdownRemark(fields: { name: { eq: "navbar" } }) {
            frontmatter {
              items {
                title
                titleMobile
                mobileOnly
                url
              }
              button {
                title
                url
              }
              socialNetworks {
                title
                items {
                  title
                  icon
                  url
                }
              }
            }
          }
        }
      `}
      render={data => <Navbar {...data.content.frontmatter} {...props} />}
    />
  );
}
