import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';
import Logo from './Logo';
import Link from './Link';

const LogoStyled = styled(Logo)`
  color: ${props => props.theme.white};
  font-size: 2rem;
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
  width: 100%;
  @media (min-width: ${({ theme }) => theme.breakpointTablet}) {
    width: auto;
  }
`;

const NavBarStartStyled = styled.div`
  flex-grow: 1;
  justify-content: center;
`;

const NavBarItemStyled = styled(Link)`
  font-weight: 300;
`;

const ButtonStyled = styled(Link)`
  font-weight: bold;
`;

const NavBarBurgerStyled = styled.div`
  align-self: center;
`;

const Navbar = ({ items, button }) => (
  <nav className="navbar">
    <NavBarContentStyled>
      <NavBarBrandStyled className="navbar-brand">
        <Link className="navbar-item" href="/">
          <LogoStyled />
        </Link>
        <NavBarBurgerStyled className="navbar-burger burger is-transparent has-text-white">
          <span />
          <span />
          <span />
        </NavBarBurgerStyled>
      </NavBarBrandStyled>

      <div className="navbar-menu">
        <NavBarStartStyled className="navbar-start">
          {items &&
            items.map(item => (
              <NavBarItemStyled
                className="navbar-item"
                href={item.url}
                key={item.title}
              >
                {item.title}
              </NavBarItemStyled>
            ))}
        </NavBarStartStyled>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <ButtonStyled className="button is-primary" href={button.url}>
                {button.title}
              </ButtonStyled>
            </div>
          </div>
        </div>
      </div>
    </NavBarContentStyled>
  </nav>
);

Navbar.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  button: PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
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
                url
              }
              button {
                title
                url
              }
            }
          }
        }
      `}
      render={data => <Navbar {...data.content.frontmatter} {...props} />}
    />
  );
}
