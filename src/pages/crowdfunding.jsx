import React from 'react';
import { graphql } from 'gatsby';
import Hero from '../components/crowdfunding-page/Hero';
import DonateForm from '../components/crowdfunding-page/DonateForm';

const CrowdfundingPage = () => (
  <>
    <Hero />
    <DonateForm />
  </>
);

export default CrowdfundingPage;

export const pageQuery = graphql`
  query CrowdfundingPageQuery {
    page: yaml(fields: { name: { eq: "page-crowdfunding" } }) {
      metadata {
        title
        description
      }
    }
  }
`;
