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

const ButtonStyled = styled(Link)`
  font-weight: bold;
`;

const Navbar = ({ items, button }) => (
  <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <Link className="navbar-item" href="/">
        <LogoStyled />
      </Link>
      <a
        role="button"
        className="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </a>
    </div>

    <div className="navbar-menu">
      <div className="navbar-start">
        {items &&
          items.map(item => (
            <Link className="navbar-item" href={item.url} key={item.title}>
              {item.title}
            </Link>
          ))}
      </div>

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
