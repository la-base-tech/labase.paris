import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';

import theme from '../styles/theme';
import '../styles/app.scss';

import SEO from './SEO';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ data, children }) => (
  <ThemeProvider theme={theme}>
    <>
      <SEO pageMetadata={data.page.frontmatter.metadata} />
      <Navbar />
      {children}
      <Footer />
    </>
  </ThemeProvider>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  data: PropTypes.shape({
    page: PropTypes.shape({
      frontmatter: PropTypes.shape({
        metadata: PropTypes.shape({
          title: PropTypes.string.isRequired,
          description: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default Layout;
