import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import Hero from '../components/crowdfunding-page/Hero';
import Status from '../components/crowdfunding-page/Status';
import DonateForm from '../components/crowdfunding-page/DonateForm';
import Markdown from '../components/Markdown';
import YoutubeEmbed from '../components/YoutubeEmbed';

const SectionTitleStyled = styled.h2`
  font-weight: 900;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  line-height: 2rem;

  @media (min-width: ${({ theme }) => theme.breakpointTablet}) {
    font-size: 2rem;
    line-height: 2.5rem;
  }
`;

const SectionTextStyled = styled(Markdown)``;

const CrowdfundingPage = ({ data }) => (
  <>
    <Hero />
    <Status />

    {/* section 1 */}
    <section className="section">
      <div className="container">
        <div className="columns">
          <div className="column">
            <SectionTitleStyled>{data.page.section1.title}</SectionTitleStyled>
            <SectionTextStyled>{data.page.section1.text}</SectionTextStyled>
          </div>
          <div className="column">
            <DonateForm />
          </div>
        </div>
      </div>
    </section>

    {/* section 2 */}
    <section className="section">
      <div className="container">
        <YoutubeEmbed {...data.page.section2.video} />
      </div>
    </section>
  </>
);

CrowdfundingPage.propTypes = {
  data: PropTypes.shape({
    page: PropTypes.shape({
      section1: PropTypes.shape({
        title: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
      }).isRequired,
      section2: PropTypes.shape({
        video: PropTypes.shape({
          youtubeId: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired,
        }).isRequired,
        button: PropTypes.shape({
          title: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default CrowdfundingPage;

export const pageQuery = graphql`
  query CrowdfundingPageQuery {
    page: yaml(fields: { name: { eq: "page-crowdfunding" } }) {
      metadata {
        title
        description
      }
      section1 {
        title
        text
      }
      section2 {
        video {
          youtubeId
          title
        }
        button {
          title
        }
      }
    }
  }
`;
