import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import Markdown from '../Markdown';

const SectionStyled = styled(BackgroundImage)``;

const TextContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  padding: 1rem;
  max-width: 1200px;
  margin: auto;
`;

const TextStyled = styled(Markdown)`
  color: ${props => props.theme.white};
  font-weight: 900;
  font-size: 3rem;
  line-height: 3.5rem;

  @media (min-width: ${({ theme }) => theme.breakpointTablet}) {
    font-size: 4rem;
    line-height: 4.5rem;
  }
`;

const HeaderSection = ({ image, text }) => {
  return (
    <SectionStyled
      id="header"
      className="hero is-fullheight-with-navbar"
      Tag="section"
      fluid={image.childImageSharp.fluid}
    >
      <TextContainer>
        <TextStyled>{text}</TextStyled>
      </TextContainer>
    </SectionStyled>
  );
};

HeaderSection.propTypes = {
  image: PropTypes.shape({
    childImageSharp: PropTypes.shape({
      fluid: PropTypes.shape({}).isRequired,
    }).isRequired,
  }).isRequired,
  text: PropTypes.string.isRequired,
};

export default function HeaderSectionWrapper(props) {
  return (
    <StaticQuery
      query={graphql`
        query {
          content: markdownRemark(fields: { name: { eq: "page-index" } }) {
            frontmatter {
              section: headerSection {
                image {
                  childImageSharp {
                    fluid(maxWidth: 1000, quality: 100) {
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
                text
              }
            }
          }
        }
      `}
      render={data => (
        <HeaderSection {...data.content.frontmatter.section} {...props} />
      )}
    />
  );
}
