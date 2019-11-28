import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInstagram,
  faFacebookF,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import Link from './Link';

const mapIcons = {
  instagram: faInstagram,
  facebook: faFacebookF,
  twitter: faTwitter,
};

const SocialNetworksLinksContainerStyled = styled.ul``;

const SocialNetworksLinkContainerStyled = styled.li`
  display: inline-block;
  &:not(:first-child) {
    margin-left: 1rem;
  }
`;

// https://github.com/styled-components/styled-components/issues/439
const LinkIconStyled = styled(({ theme, colorReversed, ...rest }) => (
  <Link {...rest} />
))`
  display: block;
  background: ${props =>
    !props.colorReversed ? props.theme.yellow : props.theme.black};
  border-radius: 100%;
  color: ${props =>
    !props.colorReversed ? props.theme.black : props.theme.white};
  text-align: center;
  width: 3rem;
  height: 3rem;
  line-height: 3rem;
  font-size: 1.3rem;

  &:hover {
    transition: all 0.2s ease;
    transform: scale(1.1);
    color: ${props =>
      !props.colorReversed ? props.theme.black : props.theme.white};
  }
`;

const SocialNetworks = ({ items, colorReversed, onClick, ...rest }) => (
  <SocialNetworksLinksContainerStyled {...rest}>
    {items.map((item, index) => (
      <SocialNetworksLinkContainerStyled key={index}>
        <LinkIconStyled
          href={item.url}
          title={item.title}
          colorReversed={colorReversed}
          onClick={onClick}
        >
          <FontAwesomeIcon icon={mapIcons[item.icon]} />
        </LinkIconStyled>
      </SocialNetworksLinkContainerStyled>
    ))}
  </SocialNetworksLinksContainerStyled>
);

SocialNetworks.propTypes = {
  colorReversed: PropTypes.bool,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  onClick: PropTypes.func,
};

SocialNetworks.defaultProps = {
  colorReversed: false,
  onClick: null,
};

export default SocialNetworks;
