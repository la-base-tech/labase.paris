import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

const SEO = ({ globalMetadata, pageMetadata }) => {
  const { title, description } = pageMetadata;
  const imageFacebookUrl = `${globalMetadata.siteUrl}/${globalMetadata.facebookImage}`;
  const imageTwitterUrl = `${globalMetadata.siteUrl}/${globalMetadata.twitterImage}`;

  return (
    <Helmet
      htmlAttributes={{
        lang: 'fr',
      }}
      title={title}
    >
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageFacebookUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageTwitterUrl} />
    </Helmet>
  );
};

SEO.propTypes = {
  globalMetadata: PropTypes.shape({
    siteUrl: PropTypes.string.isRequired,
    facebookImage: PropTypes.string.isRequired,
    twitterImage: PropTypes.string.isRequired,
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
              twitterImage
              facebookImage
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
