import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

const NotFoundPage = ({ data }) => (
  <section className="hero is-fullheight-with-navbar">
    <div className="hero-body">
      <div className="container has-text-centered">
        <div>{data.page.text}</div>
      </div>
    </div>
  </section>
);

NotFoundPage.propTypes = {
  data: PropTypes.shape({
    page: PropTypes.shape({
      text: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default NotFoundPage;

export const pageQuery = graphql`
  query {
    page: yaml(fields: { name: { eq: "page-404" } }) {
      metadata {
        title
        description
      }
      text
    }
  }
`;
