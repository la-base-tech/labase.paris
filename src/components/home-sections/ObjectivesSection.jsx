import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import Markdown from '../Markdown';

const TitleStyled = styled.h2`
  margin-bottom: 2rem;
`;

const ItemColumnsStyled = styled.div`
  @media (min-width: ${props => props.theme.breakpointTablet}) {
    &:nth-child(odd) {
      flex-direction: row-reverse;
    }
  }
`;

const ItemTitleStyled = styled.h3`
  margin-bottom: 2rem;
`;

const Section = ({ title, items }) => (
  <section className="section" id="objectifs">
    <div className="container">
      <TitleStyled>{title}</TitleStyled>
      {items.map((item, index) => (
        <ItemColumnsStyled className="columns is-vcentered" key={index}>
          <div className="column has-text-centered">
            <img src={item.image} alt={item.title} />
          </div>
          <div className="column">
            <ItemTitleStyled>{item.title}</ItemTitleStyled>
            <Markdown>{item.text}</Markdown>
          </div>
        </ItemColumnsStyled>
      ))}
    </div>
  </section>
);

Section.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
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
              section: objectivesSection {
                title
                items {
                  title
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
