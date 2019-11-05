import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { ThemeProvider } from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';

import theme from '../styles/theme';
import '../styles/app.scss';

import NavBar from './NavBar';
import Footer from './Footer';

const Layout = ({ data, children }) => (
  <ThemeProvider theme={theme}>
    <>
      <Helmet>
        {data && data.site && <title>{data.site.siteMetadata.title}</title>}
        {data && data.site && (
          <meta
            name="description"
            content={data.site.siteMetadata.description}
          />
        )}
      </Helmet>
      <NavBar />
      {children}
      <Footer />
    </>
  </ThemeProvider>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

Layout.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default function LayoutWrapper(props) {
  return (
    <StaticQuery
      query={graphql`
        query {
          site {
            siteMetadata {
              title
              description
            }
          }
        }
      `}
      render={data => <Layout data={data} {...props} />}
    />
  );
}
