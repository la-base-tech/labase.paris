import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import Link from '../Link';
import Markdown from '../Markdown';

const SectionStyled = styled(BackgroundImage)``;

const ContentContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: left;
  padding: 1rem;
  margin: auto;
  top: -20px;
`;

const TitleStyled = styled(Markdown)`
  color: ${({ theme }) => theme.white};
  font-weight: 900;
  font-size: 2rem;
  line-height: 2.5rem;

  @media (min-width: ${({ theme }) => theme.breakpointTablet}) {
    font-size: 2.7rem;
    line-height: 3rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpointDesktop}) {
    font-size: 3.4rem;
    line-height: 4rem;
  }
`;

const SubtitleStyled = styled.div`
  color: ${props => props.theme.white};
  font-size: 1rem;
  line-height: 1.1rem;
  margin-bottom: 0.5rem;

  @media (min-width: ${({ theme }) => theme.breakpointTablet}) {
    font-size: 1.5rem;
    line-height: 2rem;
  }
`;

const ButtonStyled = styled(Link)`
  margin-top: 1rem;
  font-weight: bold;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
`;

const Hero = ({ image, title, subtitle, button }) => {
  return (
    <SectionStyled
      id="header"
      className="hero is-fullheight-with-navbar"
      Tag="section"
      fluid={image.childImageSharp.fluid}
    >
      <ContentContainer className="container">
        <div>
          <SubtitleStyled>{subtitle}</SubtitleStyled>
          <TitleStyled>{title}</TitleStyled>
          <ButtonStyled href="#" className="button is-primary">
            {button.title}
          </ButtonStyled>
        </div>
      </ContentContainer>
    </SectionStyled>
  );
};

Hero.propTypes = {
  image: PropTypes.shape({
    childImageSharp: PropTypes.shape({
      fluid: PropTypes.shape({}).isRequired,
    }).isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  button: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default function HeroWrapper(props) {
  return (
    <StaticQuery
      query={graphql`
        query {
          page: yaml(fields: { name: { eq: "page-crowdfunding" } }) {
            hero {
              image {
                childImageSharp {
                  fluid(maxWidth: 2000, quality: 100) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
              title
              subtitle
              button {
                title
              }
            }
          }
        }
      `}
      render={data => <Hero {...data.page.hero} {...props} />}
    />
  );
}
