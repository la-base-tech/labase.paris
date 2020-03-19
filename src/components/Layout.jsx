import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import '@fortawesome/fontawesome-svg-core/styles.css';
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from '@fortawesome/fontawesome-svg-core';

import '../styles/app.scss';

import SEO from './SEO';
import Navbar, { Provider as NavbarProvider } from './Navbar';
import Footer from './Footer';
import { Provider as CrowdfundingStatusProvider } from './CrowdfundingStatus';

config.autoAddCss = false; /* eslint-disable import/first */

const Layout = ({ data, children, location, stats, crowdfunding }) => (
  <NavbarProvider>
    <CrowdfundingStatusProvider {...stats} {...crowdfunding}>
      <SEO pageMetadata={data.page.metadata} />
      <Navbar currentPath={location.pathname} />
      {children}
      <Footer />
    </CrowdfundingStatusProvider>
  </NavbarProvider>
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
  crowdfunding: PropTypes.shape({
    dateEnd: PropTypes.string.isRequired,
    objective: PropTypes.number.isRequired,
  }).isRequired,
  stats: PropTypes.shape({
    amount: PropTypes.number.isRequired,
    contributors: PropTypes.number.isRequired,
  }).isRequired,
};

export default function LayoutWrapper(props) {
  return (
    <StaticQuery
      query={graphql`
        query {
          crowdfunding: yaml(fields: { name: { eq: "crowdfunding" } }) {
            dateEnd
            objective
          }
          stats: laBaseApiStatsCrowdfunding {
            amount
            contributors
          }
        }
      `}
      render={data => (
        <Layout
          stats={data.stats}
          crowdfunding={data.crowdfunding}
          {...props}
        />
      )}
    />
  );
}
