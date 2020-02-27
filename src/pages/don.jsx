import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import GatsbyImage from 'gatsby-image';
import Hero from '../components/donate-page/Hero';
import Carousel from '../components/donate-page/Carousel';
import SectionTitle from '../components/donate-page/SectionTitle';
import SectionSubtitle from '../components/donate-page/SectionSubtitle';
import Markdown from '../components/Markdown';
import YoutubeEmbed from '../components/YoutubeEmbed';
import Link from '../components/Link';

const SectionTextStyled = styled(Markdown)``;

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

const DonatePage = ({ data }) => (
  <>
    <Hero />

    <section className="section" id="section-1">
      <div className="container">
        <SectionTitle>{data.page.section1.title}</SectionTitle>
        <div className="columns">
          <div className="column">
            <SectionTextStyled>{data.page.section1.text}</SectionTextStyled>
            <ButtonStyled
              href="#form"
              className="button is-primary is-inverted"
              targetMiddle
            >
              {data.page.section1.button.title}
            </ButtonStyled>
          </div>
          <div className="column is-three-fifths">
            <YoutubeEmbed {...data.page.section2.video} id="video" />
          </div>
        </div>
      </div>
    </section>

    <section className="section" id="section-2">
      <div className="container">
        <SectionTitle>{data.page.section3.title}</SectionTitle>
        <ColumnsReverseMobileStyled className="columns">
          <div className="column">
            <SectionTextStyled>{data.page.section3.text}</SectionTextStyled>
            <ButtonStyled
              href="#form"
              className="button is-primary is-inverted"
              targetMiddle
            >
              {data.page.section3.button.title}
            </ButtonStyled>
          </div>
          <div
            className="column is-flex is-hidden-mobile"
            style={{ position: 'relative' }}
          >
            <GatsbyImage
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                rigt: 0,
                bottom: 0,
                width: '100%',
                height: '100%',
              }}
              objectFit="contain"
              imgStyle={{
                objectFit: 'contain',
              }}
              fluid={data.page.section3.image.childImageSharp.fluid}
            />
          </div>
          <div className="column is-hidden-tablet">
            <GatsbyImage
              style={{ maxHeight: '80vh' }}
              objectFit="contain"
              imgStyle={{
                objectFit: 'contain',
              }}
              fluid={data.page.section3.image.childImageSharp.fluid}
            />
          </div>
        </ColumnsReverseMobileStyled>
      </div>
    </section>

    <section className="section" id="section-3">
      <div className="container">
        <SectionTitle className="has-subtitle">
          {data.page.section4.title}
        </SectionTitle>
        <SectionSubtitle>{data.page.section4.subtitle}</SectionSubtitle>
        <SectionTextStyled>{data.page.section4.text}</SectionTextStyled>
        <ButtonStyled
          href="#form"
          className="button is-primary is-inverted"
          targetMiddle
        >
          {data.page.section4.button.title}
        </ButtonStyled>
      </div>
    </section>

    <Carousel />

    <section className="section" id="section-4">
      <div className="container">
        <SectionTitle>{data.page.section5.title}</SectionTitle>
        <ColumnsReverseMobileStyled className="columns">
          <div className="column is-two-fifths">
            <SectionTextStyled>{data.page.section5.text}</SectionTextStyled>
            <ButtonStyled
              href="#form"
              className="button is-primary is-inverted"
              targetMiddle
            >
              {data.page.section5.button.title}
            </ButtonStyled>
          </div>
          <div className="column">
            <YoutubeEmbed {...data.page.section5.video} id="video-2" />
          </div>
        </ColumnsReverseMobileStyled>
      </div>
    </section>

    <section className="section" id="section-5">
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

DonatePage.propTypes = {
  data: PropTypes.shape({
    page: PropTypes.shape({
      section1: PropTypes.shape({
        title: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        button: PropTypes.shape({
          title: PropTypes.string.isRequired,
        }).isRequired,
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
        button: PropTypes.shape({
          title: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
      section5: PropTypes.shape({
        title: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        video: PropTypes.shape({
          youtubeId: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired,
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

export default DonatePage;

export const pageQuery = graphql`
  query DonatePageQuery {
    page: yaml(fields: { name: { eq: "page-donate" } }) {
      metadata {
        title
        description
      }
      section1 {
        title
        text
        button {
          title
        }
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
            fluid(maxWidth: 480) {
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
        button {
          title
        }
      }
      section5 {
        title
        text
        video {
          youtubeId
          title
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
            fluid(maxWidth: 480) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        text2
        image2 {
          childImageSharp {
            fluid(maxWidth: 480) {
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
