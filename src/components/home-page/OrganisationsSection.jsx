import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import GatsbyImage from 'gatsby-image';
import styled from 'styled-components';
import Link from '../Link';
import Markdown from '../Markdown';

const SectionStyled = styled.section`
  background: ${props => props.theme.yellow};
`;

const TitleStyled = styled.h2`
  margin-bottom: 2rem;
`;

const TextStyled = styled(Markdown)`
  margin-bottom: 2rem;
`;

const ItemTextStyled = styled(Markdown)`
  font-size: 0.7rem;
`;

const LinkStyled = styled(Link)`
  &:hover .gatsby-image-wrapper {
    transition: all 0.2s ease;
    opacity: 0.6;
  }
`;

const GatsbyImageStyled = styled(GatsbyImage)`
  mix-blend-mode: multiply;
`;

const Section = ({ title, text, items }) => (
  <SectionStyled className="section" id="associations">
    <div className="container">
      <TitleStyled>{title}</TitleStyled>
      <TextStyled>{text}</TextStyled>
      <div className="columns is-multiline is-centered is-mobile">
        {items.map((item, index) => (
          <div
            className="column is-one-quarter-tablet is-half-mobile"
            key={index}
          >
            <LinkStyled href={item.url}>
              <GatsbyImageStyled fluid={item.image.childImageSharp.fluid} />
            </LinkStyled>
            <ItemTextStyled className="is-hidden-mobile">
              {item.text}
            </ItemTextStyled>
          </div>
        ))}
      </div>
    </div>
  </SectionStyled>
);

Section.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      image: PropTypes.shape({
        childImageSharp: PropTypes.shape({
          fluid: PropTypes.shape({}).isRequired,
        }).isRequired,
      }).isRequired,
    })
  ).isRequired,
};

export default function SectionWrapper() {
  return (
    <StaticQuery
      query={graphql`
        query {
          content: yaml(fields: { name: { eq: "page-home" } }) {
            section: organisationsSection {
              title
              text
              items {
                title
                url
                text
                image {
                  childImageSharp {
                    fluid(maxWidth: 364) {
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
              }
            }
          }
        }
      `}
      render={data => <Section {...data.content.section} />}
    />
  );
}
