import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from '@fortawesome/free-solid-svg-icons';

const Wrapper = styled.footer`
  background: #000000;
  padding: 1rem;
  color: #ffffff;
`;
const IconLinks = styled.div`
  margin-bottom: 1rem;
`;

const IconLink = styled.a`
  color: ${props => props.theme.white};
  font-size: 2em;
  &:not(:last-child) {
    margin-right: 1rem;
  }

  &:hover {
    color: ${props => props.theme.darkRose};
  }
`;

const Text2 = styled.p`
  font-size: 13px;

  > a {
    text-decoration: underline;
    color: #ffffff;
  }
`;

const LogoStyled = styled.div`
  font-family: 'CaracasStencilPro', sans-serif;
  color: yellow;
  cursor: default;
  font-size: 2rem;
  margin-bottom: 1rem;

  @media (min-width: ${props => props.theme.breakpointTablet}) {
    font-size: 2rem;
  }
`;

const Footer = ({}) => (
  <Wrapper className="footer">
    <div className="content has-text-centered">
      <div className="columns is-mobile">
        <div className="column">
          <LogoStyled>labase</LogoStyled>
          <span>Contact presse clemence@labase.paris</span>
          <span>Dossier de presse</span>
          <span>Newsletter</span>
          <span>Mentions Légales</span>
        </div>
        <div className="column" />
        <div className="column">
          <span>Adresse</span>
          <span>31 rue Bichat</span>
          <span>75010 Paris</span>
        </div>
        <div className="column">
          Suivez-nous sur les réseaux sociaux :
          <IconLinks>
            <IconLink
              href="https://www.facebook.com/labase.paris/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faFacebook} />
            </IconLink>
            <IconLink
              href="https://www.facebook.com/labase.paris/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faTwitter} />
            </IconLink>
            <IconLink
              href="https://www.instagram.com/labaseparis/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </IconLink>
          </IconLinks>
        </div>
      </div>
    </div>
  </Wrapper>
);

export default Footer;
