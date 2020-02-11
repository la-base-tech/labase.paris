import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import GatsbyImage from 'gatsby-image';

const DURATION_FADE_IN = 500;

const ContainerStyled = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  > .gatsby-image-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const BackgroundImage = ({ image, children, loading }) => {
  return (
    <>
      <ContainerStyled>
        <GatsbyImage
          fluid={image.childImageSharp.fluid}
          durationFadeIn={DURATION_FADE_IN}
          loading={loading}
        />
      </ContainerStyled>
      {children && children}
    </>
  );
};

BackgroundImage.propTypes = {
  children: PropTypes.node,
  image: PropTypes.shape({
    childImageSharp: PropTypes.shape({
      fluid: PropTypes.shape({}).isRequired,
    }),
  }).isRequired,
  loading: PropTypes.string,
};

BackgroundImage.defaultProps = {
  children: null,
  loading: 'lazy',
};

export default BackgroundImage;
