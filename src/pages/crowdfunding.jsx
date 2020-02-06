import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import Hero from '../components/crowdfunding-page/Hero';
import Status from '../components/crowdfunding-page/Status';
import DonateForm from '../components/crowdfunding-page/DonateForm';
import Markdown from '../components/Markdown';
import YoutubeEmbed from '../components/YoutubeEmbed';
import Link from '../components/Link';

const SectionTitleStyled = styled.h2`
  font-weight: 900;
  margin-bottom: 2rem;
  font-size: 1.5rem;
  line-height: 2rem;

  &.has-subtitle {
    margin-bottom: 1rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpointTablet}) {
    font-size: 2rem;
    line-height: 2.5rem;
  }
`;

const SectionSubtitleStyled = styled.h3`
  font-weight: bold;
  margin-bottom: 2rem;
  font-size: 1.2rem;
  line-height: 1.5rem;

  @media (min-width: ${({ theme }) => theme.breakpointTablet}) {
    font-size: 1.4rem;
    line-height: 1.9rem;
  }
`;

const SectionTextStyled = styled(Markdown)``;

const Section3Text2Styled = styled(SectionTextStyled)`
  font-size: 0.9rem;
  h4 {
    text-transform: uppercase;
    letter-spacing: 0.05rem;
    font-size: 0.7rem;
    line-height: 1rem;

    p + & {
      margin-top: 1rem;
    }
  }

  p + h4 {
    margin-top: 1rem;
  }

  h4 + p {
    margin-top: 0 !important;
  }
`;

const ButtonStyled = styled(Link)`
  padding: 1rem 2rem !important;
  margin-top: 1rem;
  font-weight: bold;
`;

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

    {/* section 3 */}
    <section className="section">
      <div className="container">
        <SectionTitleStyled className="has-subtitle">
          {data.page.section3.title}
        </SectionTitleStyled>
        <SectionSubtitleStyled>
          {data.page.section3.subtitle}
        </SectionSubtitleStyled>
        <div className="columns">
          <div className="column is-two-thirds">
            <SectionTextStyled>{data.page.section3.text}</SectionTextStyled>
            <ButtonStyled href="#" className="button is-primary">
              {data.page.section3.button.title}
            </ButtonStyled>
          </div>
          <div className="column is-hidden-mobile">
            <Section3Text2Styled>
              {data.page.section3.text2}
            </Section3Text2Styled>
          </div>
        </div>
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
      section3: PropTypes.shape({
        title: PropTypes.string.isRequired,
        subtitle: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        text2: PropTypes.string.isRequired,
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
      section3 {
        title
        subtitle
        text
        text2
        button {
          title
        }
      }
    }
  }
`;
