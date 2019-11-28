import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import FacebookEventsWidget from '../FacebookEventsWidget';
import Link from '../Link';

const SectionStyled = styled.section`
  background: ${props => props.theme.black};
`;

const TitleStyled = styled.h2`
  margin-bottom: 2rem;
  color: ${props => props.theme.yellow};
`;

const TextStyled = styled(ReactMarkdown)`
  margin-bottom: 2rem;
  color: ${props => props.theme.white};
`;

const ButtonStyled = styled(Link)`
  font-weight: bold;
`;

const Section = ({ title, text, facebookUrl, button }) => (
  <SectionStyled className="section" id="evenements">
    <div className="container">
      <div className="columns">
        <div className="column is-three-fifths">
          <TitleStyled>{title}</TitleStyled>
          <div className="is-hidden-mobile">
            <TextStyled source={text} />
            <ButtonStyled href={button.url} className="button is-primary">
              {button.title}
            </ButtonStyled>
          </div>
        </div>
        <div className="column">
          <FacebookEventsWidget pageUrl={facebookUrl} />
        </div>
      </div>
    </div>
  </SectionStyled>
);

Section.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  facebookUrl: PropTypes.string.isRequired,
  button: PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default function SectionWrapper() {
  return (
    <StaticQuery
      query={graphql`
        query {
          content: markdownRemark(fields: { name: { eq: "page-index" } }) {
            frontmatter {
              section: eventSection {
                title
                text
                facebookUrl
                button {
                  title
                  url
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
