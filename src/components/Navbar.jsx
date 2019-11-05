import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';
import GatsbyImage from 'gatsby-image/withIEPolyfill';

const LogoStyled = styled.span`
  cursor: default;
  padding: 0.5rem 0.75rem;
`;

const Navbar = ({ data }) => (
  <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <a className="navbar-item" href="labase.paris">
        <LogoStyled>
          <span>
            {' '}
            <GatsbyImage fixed={data.logo.childImageSharp.fixed} />
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
        <a className="navbar-item">Présentation</a>

        <a className="navbar-item">Événements</a>

        <a className="navbar-item">Les Orgas</a>

        <a className="navbar-item">Contact</a>
      </div>

      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            <a className="button is-light">J'agis !</a>
          </div>
        </div>
      </div>
    </div>
  </nav>
);

Navbar.propTypes = {
  data: PropTypes.shape({
    logo: PropTypes.shape({
      childImageSharp: PropTypes.shape({
        fixed: PropTypes.shape({}).isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default function NavbarWrapper(props) {
  return (
    <StaticQuery
      query={graphql`
        query {
          logo: file(relativePath: { eq: "logo.png" }) {
            childImageSharp {
              fixed(width: 200, quality: 100) {
                ...GatsbyImageSharpFixed_withWebp_noBase64
              }
            }
          }
        }
      `}
      render={data => <Navbar data={data} {...props} />}
    />
  );
}
