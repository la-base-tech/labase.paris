import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';
import Carousel from '../../Carousel';
import CustomCarousel from './Carousel';

const SectionStyled = styled.section`
  @media (max-width: ${({ theme }) => theme.breakpointTabletBefore}) {
    padding: 3rem 0;
  }
`;

const CarouselContainer = ({ slides }) => {
  return (
    <SectionStyled className="section">
      <div className="container">
        <Carousel slideCount={slides.length} timeout={5000}>
          <CustomCarousel slides={slides} />
        </Carousel>
      </div>
    </SectionStyled>
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
