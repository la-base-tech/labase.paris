import React from 'react';
import { graphql } from 'gatsby';
import DonateForm from '../components/crowdfunding-page/DonateForm';

const CrowdfundingPage = () => (
  <>
    <div>crowdfunding page</div>
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
