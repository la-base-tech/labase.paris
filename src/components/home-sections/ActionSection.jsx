import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import Link from '../Link';
import Markdown from '../Markdown';

const TitleStyled = styled.h2`
  margin-bottom: 2rem;
`;

const ImageStyled = styled.img`
  width: 150px;
  height: 150px;
`;

const ButtonStyled = styled(Link)`
  padding: 1rem 2rem !important;
  margin-top: 1rem;
  font-weight: bold;
`;

const TextStyled = styled(Markdown)`
  @media (min-width: ${({ theme }) => theme.breakpointTablet}) {
    height: 4.5rem;
    display: flex;
    align-items: center;
  }
`;

const ActionSection = ({ title, items }) => (
  <section className="section" id="action">
    <div className="container">
      <TitleStyled>{title}</TitleStyled>
      <div className="columns">
        {items.map((item, index) => (
          <div className="column has-text-centered" key={index}>
            <ImageStyled src={item.image} alt={item.button} />
            <TextStyled>{item.text}</TextStyled>
            <ButtonStyled
              href={item.url}
              className={`button is-primary ${index % 2 && ' is-inverted'}`}
            >
              {item.button}
            </ButtonStyled>
          </div>
        ))}
      </div>
    </div>
  </section>
);

ActionSection.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      button: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default function ActionSectionWrapper() {
  return (
    <StaticQuery
      query={graphql`
        query {
          content: yaml(fields: { name: { eq: "page-index" } }) {
            section: actionSection {
              title
              items {
                text
                button
                url
                image
              }
            }
          }
        }
      `}
      render={data => <ActionSection {...data.content.section} />}
    />
  );
}
