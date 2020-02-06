import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';
import Carousel from '../../Carousel';
import CustomCarousel from './Carousel';
import SectionTitle from '../SectionTitle';

const CarouselContainer = ({ slides }) => {
  return (
    <section className="section">
      <div className="container">
        <SectionTitle className="is-hidden-tablet">
          12 mois en 12 points
        </SectionTitle>
        <Carousel slideCount={slides.length} timeout={5000}>
          <CustomCarousel slides={slides} />
        </Carousel>
      </div>
    </section>
  );
};

CarouselContainer.propTypes = {
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.shape({
        childImageSharp: PropTypes.shape({
          fluid: PropTypes.shape({}).isRequired,
        }).isRequired,
      }).isRequired,
      title: PropTypes.string.isRequired,
      subtitle: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default function CarouselWrapper(props) {
  return (
    <StaticQuery
      query={graphql`
        query {
          page: yaml(fields: { name: { eq: "page-crowdfunding" } }) {
            carousel {
              image {
                childImageSharp {
                  fluid(maxWidth: 2000, quality: 100) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
              title
              subtitle
            }
          }
        }
      `}
      render={data => (
        <CarouselContainer slides={data.page.carousel} {...props} />
      )}
    />
  );
}
