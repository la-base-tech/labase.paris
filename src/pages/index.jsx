import React from 'react';
import { graphql } from 'gatsby';

import CrowdfundingSection from '../components/home-sections/CrowdfundingSection';
import HeaderSection from '../components/home-sections/HeaderSection';
import NewsletterSection from '../components/home-sections/NewsletterSection';
import PresentationSection from '../components/home-sections/PresentationSection';
import PresentationBisSection from '../components/home-sections/PresentationBisSection';
import EventSection from '../components/home-sections/EventSection';
import ActionSection from '../components/home-sections/ActionSection';
import ObjectivesSection from '../components/home-sections/ObjectivesSection';
import OrganisationsSection from '../components/home-sections/OrganisationsSection';

const IndexPage = () => (
  <>
    <CrowdfundingSection />
    <HeaderSection />
    <NewsletterSection />
    <PresentationSection />
    <PresentationBisSection />
    <ObjectivesSection />
    <EventSection />
    <ActionSection />
    <OrganisationsSection />
  </>
);

export default IndexPage;

export const pageQuery = graphql`
  query HomePageQuery {
    page: yaml(fields: { name: { eq: "page-home" } }) {
      metadata {
        title
        description
      }
    }
  }
`;
