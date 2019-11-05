import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';
import GatsbyImage from 'gatsby-image/withIEPolyfill';

const LogoStyled = styled.span`
  cursor: default;
  padding: 0.5rem 0.75rem;
`;

const Navbar = ({ logo, items, button }) => (
  <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <a className="navbar-item" href="labase.paris">
        <LogoStyled>
          <span>
            {' '}
            <GatsbyImage fixed={logo.childImageSharp.fixed} />
          </span>
        </LogoStyled>
      </a>
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

    <div id="navbarBasicExample" className="navbar-menu">
      <div className="navbar-start">
        {items &&
          items.map(item => (
            <a className="navbar-item" href={item.path} key={item.title}>
              {item.title}
            </a>
          ))}
      </div>

      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            <a className="button is-light" href={button.path}>
              {button.title}
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
);

Navbar.propTypes = {
  logo: PropTypes.shape({
    childImageSharp: PropTypes.shape({
      fixed: PropTypes.shape({}).isRequired,
    }).isRequired,
  }).isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ).isRequired,
  button: PropTypes.shape({
    title: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default function NavbarWrapper(props) {
  return (
    <StaticQuery
      query={graphql`
        query {
          content: markdownRemark(fields: { name: { eq: "navbar" } }) {
            frontmatter {
              logo {
                childImageSharp {
                  fixed(width: 200, quality: 100) {
                    ...GatsbyImageSharpFixed_withWebp_noBase64
                  }
                }
              }
              items {
                title
                path
              }
              button {
                title
                path
              }
            }
          }
        }
      `}
      render={data => <Navbar {...data.content.frontmatter} {...props} />}
    />
  );
}
