import React from 'react';
import PropTypes from 'prop-types';

import '../styles/app.scss';

import SEO from './SEO';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ data, children, location }) => (
  <>
    <SEO pageMetadata={data.page.metadata} />
    <Navbar currentPath={location.pathname} />
    {children}
    <Footer />
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  data: PropTypes.shape({
    page: PropTypes.shape({
      metadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default Layout;
