import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import GatsbyImage from 'gatsby-image';
import Hero from '../components/crowdfunding-page/Hero';
import Status from '../components/crowdfunding-page/Status';
import DonateForm from '../components/crowdfunding-page/DonateForm';
import Carousel from '../components/crowdfunding-page/Carousel';
import SectionTitle from '../components/crowdfunding-page/SectionTitle';
import SectionSubtitle from '../components/crowdfunding-page/SectionSubtitle';
import Markdown from '../components/Markdown';
import YoutubeEmbed from '../components/YoutubeEmbed';
import Link from '../components/Link';

const SectionTextStyled = styled(Markdown)``;

const Section4Text2Styled = styled(SectionTextStyled)`
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

const ColumnsReverseMobileStyled = styled.div`
  @media (max-width: ${({ theme }) => theme.breakpointTabletBefore}) {
    flex-direction: column-reverse;
    display: flex;
  }
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
            <SectionTitle>{data.page.section1.title}</SectionTitle>
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
        <SectionTitle>{data.page.section3.title}</SectionTitle>
        <ColumnsReverseMobileStyled className="columns">
          <div className="column">
            <SectionTextStyled>{data.page.section3.text}</SectionTextStyled>
            <ButtonStyled
              href="#form"
              className="button is-primary"
              targetMiddle
            >
              {data.page.section3.button.title}
            </ButtonStyled>
          </div>
          <div className="column">
            <GatsbyImage
              fluid={data.page.section3.image.childImageSharp.fluid}
            />
          </div>
        </ColumnsReverseMobileStyled>
      </div>
    </section>

    {/* section 4 */}
    <section className="section">
      <div className="container">
        <SectionTitle className="has-subtitle">
          {data.page.section4.title}
        </SectionTitle>
        <SectionSubtitle>{data.page.section4.subtitle}</SectionSubtitle>
        <div className="columns">
          <div className="column is-two-thirds">
            <SectionTextStyled>{data.page.section4.text}</SectionTextStyled>
            <ButtonStyled
              href="#form"
              className="button is-primary"
              targetMiddle
            >
              {data.page.section4.button.title}
            </ButtonStyled>
          </div>
          <div className="column is-hidden-mobile">
            <Section4Text2Styled>
              {data.page.section4.text2}
            </Section4Text2Styled>
          </div>
        </div>
      </div>
    </section>

    <Carousel />

    {/* section 5 */}
    <section className="section">
      <div className="container">
        <SectionTitle>{data.page.section5.title}</SectionTitle>
        <ColumnsReverseMobileStyled className="columns">
          <div className="column is-two-fifths">
            <SectionTextStyled>{data.page.section5.text}</SectionTextStyled>
            <ButtonStyled
              href="#form"
              className="button is-primary"
              targetMiddle
            >
              {data.page.section5.button.title}
            </ButtonStyled>
          </div>
          <div className="column">
            <GatsbyImage
              fluid={data.page.section5.image.childImageSharp.fluid}
            />
          </div>
        </ColumnsReverseMobileStyled>
      </div>
    </section>

    {/* section 6 */}
    <section className="section">
      <div className="container">
        <SectionTitle>{data.page.section6.title}</SectionTitle>
        <ColumnsReverseMobileStyled className="columns">
          <div className="column">
            <SectionTextStyled>{data.page.section6.text1}</SectionTextStyled>
          </div>
          <div className="column">
            <GatsbyImage
              fluid={data.page.section6.image1.childImageSharp.fluid}
            />
          </div>
        </ColumnsReverseMobileStyled>
        <div className="columns">
          <div className="column">
            <GatsbyImage
              fluid={data.page.section6.image2.childImageSharp.fluid}
            />
          </div>
          <div className="column">
            <SectionTextStyled>{data.page.section6.text2}</SectionTextStyled>
            <ButtonStyled
              href="#form"
              className="button is-primary is-inverted"
              targetMiddle
            >
              {data.page.section6.button.title}
            </ButtonStyled>
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
        text: PropTypes.string.isRequired,
        image: PropTypes.shape({
          childImageSharp: PropTypes.shape({
            fluid: PropTypes.shape({}).isRequired,
          }).isRequired,
        }).isRequired,
        button: PropTypes.shape({
          title: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
      section4: PropTypes.shape({
        title: PropTypes.string.isRequired,
        subtitle: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        text2: PropTypes.string.isRequired,
        button: PropTypes.shape({
          title: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
      section5: PropTypes.shape({
        title: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        image: PropTypes.shape({
          childImageSharp: PropTypes.shape({
            fluid: PropTypes.shape({}).isRequired,
          }).isRequired,
        }).isRequired,
        button: PropTypes.shape({
          title: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
      section6: PropTypes.shape({
        title: PropTypes.string.isRequired,
        text1: PropTypes.string.isRequired,
        image1: PropTypes.shape({
          childImageSharp: PropTypes.shape({
            fluid: PropTypes.shape({}).isRequired,
          }).isRequired,
        }).isRequired,
        text2: PropTypes.string.isRequired,
        image2: PropTypes.shape({
          childImageSharp: PropTypes.shape({
            fluid: PropTypes.shape({}).isRequired,
          }).isRequired,
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
      section3 {
        title
        text
        image {
          childImageSharp {
            fluid(maxWidth: 1000, quality: 100) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        button {
          title
        }
      }
      section4 {
        title
        subtitle
        text
        text2
        button {
          title
        }
      }
      section5 {
        title
        text
        image {
          childImageSharp {
            fluid(maxWidth: 2000, quality: 100) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        button {
          title
        }
      }
      section6 {
        title
        text1
        image1 {
          childImageSharp {
            fluid(maxWidth: 1000, quality: 100) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        text2
        image2 {
          childImageSharp {
            fluid(maxWidth: 1000, quality: 100) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        button {
          title
        }
      }
    }
  }
`;
