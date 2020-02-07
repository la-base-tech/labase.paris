import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import GatsbyImage from 'gatsby-image';
import styled from 'styled-components';
import Link from '../Link';

const ContainerStyled = styled.section`
  background: ${props => props.theme.yellow};
`;

const TitleStyled = styled.h2`
  color: ${props => props.theme.black};
  font-weight: 900;
  font-size: 2.5rem;
  line-height: 3rem;

  @media (min-width: ${({ theme }) => theme.breakpointTablet}) {
    font-size: 2.7rem;
    line-height: 3.2rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpointDesktop}) {
    font-size: 3rem;
    line-height: 3.5rem;
  }
`;

const TextStyled = styled.p`
  margin: 1rem 0;
`;

const ButtonStyled = styled(Link)`
  padding: 1rem 2rem !important;
  margin-top: 1rem;
  font-weight: bold;
`;

const Section = ({ title, text, button, image }) => (
  <ContainerStyled className="section">
    <div className="container">
      <div className="columns is-vcentered">
        <div className="column">
          <TitleStyled>{title}</TitleStyled>
          <TextStyled>{text}</TextStyled>
          <ButtonStyled href="/don/" className="button is-primary is-inverted">
            {button.title}
          </ButtonStyled>
        </div>
        <div className="column is-hidden-mobile">
          <GatsbyImage fluid={image.childImageSharp.fluid} />
        </div>
      </div>
    </div>
  </ContainerStyled>
);

Section.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  image: PropTypes.shape({
    childImageSharp: PropTypes.shape({
      fluid: PropTypes.shape({}).isRequired,
    }).isRequired,
  }).isRequired,
  button: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default function SectionWrapper() {
  return (
    <StaticQuery
      query={graphql`
        query {
          content: yaml(fields: { name: { eq: "page-home" } }) {
            section: crowdfundingSection {
              title
              text
              image {
                childImageSharp {
                  fluid(maxWidth: 1000, quality: 100) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
              button {
                title
              }
            }
          }
        }
      `}
      render={data => <Section {...data.content.section} />}
    />
  );
}
