import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { ThemeProvider } from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';
import theme from '../styles/theme';
import NavBar from './NavBar';
import HeaderSection from './sections/HeaderSection';
import WhatIsBaseSection from './sections/WhatIsBaseSection';
import ForWhatSection from './sections/ForWhatSection';
import EventSection from './sections/EventSection';
import ActionSection from './sections/ActionSection';
import WhoSection from './sections/WhoSection';

import Footer from './Footer';
import '../styles/app.scss';

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
      <HeaderSection />

      <WhatIsBaseSection />
      <ForWhatSection />
      <EventSection />
      <ActionSection />
      <WhoSection />

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
