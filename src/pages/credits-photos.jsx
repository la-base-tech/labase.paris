import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from 'styled-components';

const PageTitleStyled = styled.h1`
  font-weight: 900;
  line-height: 100%;
  font-size: 2.5rem;
`;

const CreditPageTitleStyled = styled.h2`
  font-weight: 900;
  font-size: 1.5rem;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
`;

const CreditStyled = styled.div``;

const CreditsPhotos = ({ data }) => (
  <section className="section">
    <div className="container">
      <PageTitleStyled>{data.page.title}</PageTitleStyled>
      {data.page.credits.map(({ page, credits }) => (
        <div key={page}>
          <CreditPageTitleStyled>{page}</CreditPageTitleStyled>
          {credits.map((credit, index) => (
            <CreditStyled key={index}>{credit}</CreditStyled>
          ))}
        </div>
      ))}
    </div>
  </section>
);

CreditsPhotos.propTypes = {
  data: PropTypes.shape({
    page: PropTypes.shape({
      title: PropTypes.string.isRequired,
      credits: PropTypes.arrayOf(
        PropTypes.shape({
          page: PropTypes.string.isRequired,
          credits: PropTypes.arrayOf(PropTypes.string),
        })
      ),
    }).isRequired,
  }).isRequired,
};

export default CreditsPhotos;

export const pageQuery = graphql`
  query CreditsPhotosPageQuery {
    page: yaml(fields: { name: { eq: "page-credits-photos" } }) {
      metadata {
        title
        description
      }
      title
      credits {
        page
        credits
      }
    }
  }
`;
