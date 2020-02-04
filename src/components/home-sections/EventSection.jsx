import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import FacebookEventsWidget from '../FacebookEventsWidget';
import Link from '../Link';
import Markdown from '../Markdown';

const SectionStyled = styled.section`
  background: ${props => props.theme.black};
`;

const TitleStyled = styled.h2`
  margin-bottom: 2rem;
  color: ${props => props.theme.yellow};
`;

const TextStyled = styled(Markdown)`
  margin-bottom: 2rem;
  color: ${props => props.theme.white};
`;

const ButtonStyled = styled(Link)`
  font-weight: bold;
`;

const FacebookEventWidgetWrapperStyled = styled.div`
  position: relative;
  display: flex;
  height: 80vh;
  max-height: 500px;

  @media (min-width: ${({ theme }) => theme.breakpointTablet}) {
    width: 100%;
    height: 100%;
    min-height: 500px;
  }
`;

const Section = ({ title, text, facebookUrl, button }) => (
  <SectionStyled className="section" id="evenements">
    <div className="container">
      <div className="columns">
        <div className="column is-three-fifths">
          <TitleStyled>{title}</TitleStyled>
          <div className="is-hidden-mobile">
            <TextStyled>{text}</TextStyled>
            <ButtonStyled href={button.url} className="button is-primary">
              {button.title}
            </ButtonStyled>
          </div>
        </div>
        <div className="column">
          <FacebookEventWidgetWrapperStyled>
            <FacebookEventsWidget pageUrl={facebookUrl} />
          </FacebookEventWidgetWrapperStyled>
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
          content: yaml(fields: { name: { eq: "page-index" } }) {
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
      `}
      render={data => <Section {...data.content.section} />}
    />
  );
}
