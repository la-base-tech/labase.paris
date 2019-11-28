import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInstagram,
  faFacebookF,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import Logo from './Logo';
import Link from './Link';

const mapIcons = {
  instagram: faInstagram,
  facebook: faFacebookF,
  twitter: faTwitter,
};

const FooterStyled = styled.footer`
  background: ${props => props.theme.black};
  color: ${props => props.theme.white};
`;

const LogoStyled = styled(Logo)`
  font-size: 3rem;
  line-height: 100%;
  color: ${props => props.theme.yellow};
  margin-bottom: 2rem;
`;

const ColumnTitleStyled = styled.h4`
  font-weight: bold;
  cursor: default;
`;

const LinkStyled = styled(Link)`
  &,
  &:hover {
    color: ${props => props.theme.white};
  }
  &:hover {
    text-decoration: underline;
  }
`;

const SocialNetworksLinksContainerStyled = styled.ul`
  margin-top: 1rem;
`;

const SocialNetworksLinkContainerStyled = styled.li`
  display: inline-block;
  &:not(:first-child) {
    margin-left: 1rem;
  }
`;

const LinkIconStyled = styled(Link)`
  display: block;
  background: ${props => props.theme.yellow};
  border-radius: 100%;
  color: ${props => props.theme.black};
  text-align: center;
  width: 3rem;
  height: 3rem;
  line-height: 3rem;
  font-size: 1.3rem;

  &:hover {
    transition: all 0.2s ease;
    transform: scale(1.1);
  }
`;

const Footer = ({ press, links, addressTitle, address, socialNetworks }) => (
  <FooterStyled className="footer" id="footer">
    <div className="container">
      <LogoStyled />

      <div className="columns">
        <div className="column">
          <ColumnTitleStyled>{press.title}</ColumnTitleStyled>
          <div>{press.email}</div>
          <ul>
            {links.map((link, index) => (
              <li key={index}>
                <LinkStyled href={link.url}>{link.title}</LinkStyled>
              </li>
            ))}
          </ul>
        </div>
        <div className="column">
          <ColumnTitleStyled>{addressTitle}</ColumnTitleStyled>
          <div>{address}</div>
        </div>
        <div className="column">
          <ColumnTitleStyled>{socialNetworks.title}</ColumnTitleStyled>
          <SocialNetworksLinksContainerStyled>
            {socialNetworks.items.map((item, index) => (
              <SocialNetworksLinkContainerStyled key={index}>
                <LinkIconStyled href={item.url} title={item.title}>
                  <FontAwesomeIcon icon={mapIcons[item.icon]} />
                </LinkIconStyled>
              </SocialNetworksLinkContainerStyled>
            ))}
          </SocialNetworksLinksContainerStyled>
        </div>
      </div>
    </div>
  </FooterStyled>
);

Footer.propTypes = {
  press: PropTypes.shape({
    title: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      downloadable: PropTypes.bool,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  addressTitle: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
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

export default function FooterWrapper() {
  return (
    <StaticQuery
      query={graphql`
        query {
          content: markdownRemark(fields: { name: { eq: "footer" } }) {
            frontmatter {
              press {
                title
                email
              }
              links {
                title
                download
                url
              }
              addressTitle
              address
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
      render={data => <Footer {...data.content.frontmatter} />}
    />
  );
}
