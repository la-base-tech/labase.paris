import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import GatsbyImage from 'gatsby-image/withIEPolyfill';

const HeaderSection = ({ data }) => (
  <section className="hero is-fullheight">
    <GatsbyImage fluid={data.image.childImageSharp.fluid} />
  </section>
);

HeaderSection.propTypes = {
  data: PropTypes.shape({
    image: PropTypes.shape({
      childImageSharp: PropTypes.shape({
        fluid: PropTypes.shape({}).isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default function HeaderSectionWrapper(props) {
  return (
    <StaticQuery
      query={graphql`
        query {
          image: file(relativePath: { eq: "image-header.png" }) {
            childImageSharp {
              fluid(maxWidth: 1000, quality: 100) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      `}
      render={data => <HeaderSection data={data} {...props} />}
    />
  );
}
