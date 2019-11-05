import React from 'react';
import styled from 'styled-components';

const LogoStyled = styled.span`
  cursor: default;
  padding: 0.5rem 0.75rem;
`;

const NavBar = () => (
  <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <a className="navbar-item" href="labase.paris">
        <LogoStyled>
          <span>
            {' '}
            <img src="../../images/labase.png" />
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

export default NavBar;
