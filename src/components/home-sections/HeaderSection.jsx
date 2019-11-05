import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import GatsbyImage from 'gatsby-image/withIEPolyfill';

const HeaderSection = ({ image }) => {
  return (
    <section className="hero is-fullheight">
      <GatsbyImage fluid={image.childImageSharp.fluid} />
    </section>
  );
};

HeaderSection.propTypes = {
  image: PropTypes.shape({
    childImageSharp: PropTypes.shape({
      fluid: PropTypes.shape({}).isRequired,
    }).isRequired,
  }).isRequired,
};

export default function HeaderSectionWrapper(props) {
  return (
    <StaticQuery
      query={graphql`
        query {
          content: markdownRemark(fields: { name: { eq: "page-index" } }) {
            frontmatter {
              headerSection {
                image {
                  childImageSharp {
                    fluid(maxWidth: 1000, quality: 100) {
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
              }
            }
          }
        }
      `}
      render={data => (
        <HeaderSection {...data.content.frontmatter.headerSection} {...props} />
      )}
    />
  );
}
