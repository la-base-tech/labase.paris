import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import ReactMarkdown from 'react-markdown/with-html';
import styled from 'styled-components';

const SectionStyled = styled.section`
  margin-top: 2rem;
`;

const ColumnStyled = styled.div`
  @media (max-width: ${props => props.theme.breakpointTablet}) {
    display: flex;
    flex-direction: column-reverse;
  }
`;

const TitleStyled = styled.h2`
  margin-bottom: 2rem;
`;

const PresentationSection = ({ image, title, text }) => (
  <SectionStyled className="section" id="presentation">
    <div className="container">
      <ColumnStyled className="columns is-vcentered">
        <div className="column">
          <TitleStyled className="is-hidden-mobile">{title}</TitleStyled>
          <ReactMarkdown source={text} />
        </div>
        <div className="column">
          <TitleStyled className="is-hidden-tablet">{title}</TitleStyled>
          <img src={image} alt={title} />
        </div>
      </ColumnStyled>
    </div>
  </SectionStyled>
);

PresentationSection.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default function PresentationSectionWrapper() {
  return (
    <StaticQuery
      query={graphql`
        query {
          content: markdownRemark(fields: { name: { eq: "page-index" } }) {
            frontmatter {
              section: presentationSection {
                image
                title
                text
              }
            }
          }
        }
      `}
      render={data => (
        <PresentationSection {...data.content.frontmatter.section} />
      )}
    />
  );
}