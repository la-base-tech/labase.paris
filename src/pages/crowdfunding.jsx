import React from 'react';
import { graphql } from 'gatsby';

const CrowdfundingPage = () => (
  <>
    <div>crowdfunding page</div>
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
