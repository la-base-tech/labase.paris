import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import TwitterMetadata from './TwitterMetadata';

const SEO = ({ globalMetadata, pageMetadata }) => {
  const { title, description } = pageMetadata;
  const { siteUrl, socialShareImage, twitterNickname } = globalMetadata;
  const image = `${siteUrl}${socialShareImage}`;

  return (
    <>
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
      </Helmet>

      <TwitterMetadata
        card="summary_large_image"
        site={twitterNickname}
        title={title}
        description={description}
        imageUrl={image}
      />
    </>
  );
};

SEO.propTypes = {
  globalMetadata: PropTypes.shape({
    siteUrl: PropTypes.string.isRequired,
    socialShareImage: PropTypes.string.isRequired,
    twitterNickname: PropTypes.string.isRequired,
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
              twitterNickname
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
