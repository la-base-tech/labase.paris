import React from 'react';
import { graphql } from 'gatsby';

import CrowdfundingSection from '../components/home-page/CrowdfundingSection';
import HeaderSection from '../components/home-page/HeaderSection';
import NewsletterSection from '../components/home-page/NewsletterSection';
import PresentationSection from '../components/home-page/PresentationSection';
import PresentationBisSection from '../components/home-page/PresentationBisSection';
import EventSection from '../components/home-page/EventSection';
import ActionSection from '../components/home-page/ActionSection';
import ObjectivesSection from '../components/home-page/ObjectivesSection';
import OrganisationsSection from '../components/home-page/OrganisationsSection';

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
