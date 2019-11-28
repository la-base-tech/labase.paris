import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import ReactMarkdown from 'react-markdown/with-html';
import styled from 'styled-components';

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
          <div className="column">
            <img src={item.image} alt={item.title} />
          </div>
          <div className="column">
            <ItemTitleStyled>{item.title}</ItemTitleStyled>
            <ReactMarkdown source={item.text} />
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
