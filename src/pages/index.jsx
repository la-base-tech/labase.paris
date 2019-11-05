import React from 'react';
import { graphql } from 'gatsby';

import HeaderSection from '../components/home-sections/HeaderSection';
import NewsletterSection from '../components/home-sections/NewsletterSection';
import WhatIsBaseSection from '../components/home-sections/WhatIsBaseSection';
import ForWhatSection from '../components/home-sections/ForWhatSection';
import EventSection from '../components/home-sections/EventSection';
import ActionSection from '../components/home-sections/ActionSection';
import WhoSection from '../components/home-sections/WhoSection';

const IndexPage = () => (
  <>
    <HeaderSection />
    <NewsletterSection />
    <WhatIsBaseSection />
    <ForWhatSection />
    <EventSection />
    <ActionSection />
    <WhoSection />
  </>
);

export default IndexPage;

export const pageQuery = graphql`
  query {
    page: markdownRemark(fields: { name: { eq: "page-index" } }) {
      frontmatter {
        metadata {
          title
          description
        }
      }
    }
  }
`;
