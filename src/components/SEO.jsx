import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

const SEO = ({ globalMetadata, pageMetadata }) => {
  const { title, description } = pageMetadata;
  const image = `${globalMetadata.siteUrl}/${globalMetadata.socialShareImage}`;

  return (
    <Helmet
      htmlAttributes={{
        lang: 'fr',
      }}
      bodyAttributes={{
        class: 'has-navbar-fixed-top',
      }}
      title={title}
    >
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};

SEO.propTypes = {
  globalMetadata: PropTypes.shape({
    siteUrl: PropTypes.string.isRequired,
    socialShareImage: PropTypes.string.isRequired,
  }).isRequired,
  pageMetadata: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default function SEOWrapper(props) {
  return (
    <StaticQuery
      query={graphql`
        query {
          site {
            siteMetadata {
              siteUrl
              socialShareImage
            }
          }
        }
      `}
      render={data => (
        <SEO globalMetadata={data.site.siteMetadata} {...props} />
      )}
    />
  );
}
