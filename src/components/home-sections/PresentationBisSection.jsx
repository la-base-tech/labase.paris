import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import Markdown from '../Markdown';

const SectionStyled = styled.section``;

const TitleStyled = styled.h3`
  margin-bottom: 2rem;
`;

const ItemTextStyled = styled(Markdown)`
  font-size: 1.1rem;
`;

const Section = ({ title, items }) => (
  <SectionStyled className="section" id="presentation-suite">
    <div className="container">
      <TitleStyled>{title}</TitleStyled>
      <div className="columns">
        {items.map((item, index) => (
          <div className="column has-text-centered" key={index}>
            <img src={item.image} alt={item.text} />
            <ItemTextStyled className="has-text-centered">
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
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default function SectionWrapper() {
  return (
    <StaticQuery
      query={graphql`
        query {
          content: markdownRemark(fields: { name: { eq: "page-index" } }) {
            frontmatter {
              section: presentationBisSection {
                title
                items {
                  text
                  image
                }
              }
            }
          }
        }
      `}
      render={data => <Section {...data.content.frontmatter.section} />}
    />
  );
}
