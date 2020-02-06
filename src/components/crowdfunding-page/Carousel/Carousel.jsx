import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Context as CarouselContext } from '../../Carousel';
import CustomSlide from './Slide';

const ContainerStyled = styled.div`
  position: relative;
  width: 100%;
  max-height: 100%;
  overflow: hidden;
  padding-bottom: ${(9 / 16) * 100}%;
`;

const ControlStyled = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;

  &:hover {
    transition: opacity 0.23s ease;
    opacity: 0.8;
  }
`;

const LeftControlStyled = styled(ControlStyled)`
  left: 1.5rem;
`;

const RightControlStyled = styled(ControlStyled)`
  right: 1.5rem;
`;

const ControlIconStyled = styled(FontAwesomeIcon)`
  font-size: 2rem;
  color: ${({ theme }) => theme.white};
`;

const CustomCarousel = ({ slides, ...rest }) => {
  const { currentSlideIndex, loadNextSlide, loadPreviousSlide } = useContext(
    CarouselContext
  );

  return (
    <ContainerStyled {...rest}>
      {slides.map((slide, index) => (
        <CustomSlide
          key={index}
          className={`${currentSlideIndex === index ? 'is-current' : ''}`}
          {...slide}
          index={index}
        />
      ))}
      <div className="is-hidden-mobile">
        <LeftControlStyled onClick={() => loadPreviousSlide(true)}>
          <ControlIconStyled icon={faArrowLeft} />
        </LeftControlStyled>
        <RightControlStyled onClick={() => loadNextSlide(true)}>
          <ControlIconStyled icon={faArrowRight} />
        </RightControlStyled>
      </div>
    </ContainerStyled>
  );
};

CustomCarousel.propTypes = {
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      subtitle: PropTypes.string.isRequired,
      image: PropTypes.shape({
        childImageSharp: PropTypes.shape({
          fluid: PropTypes.shape({}).isRequired,
        }).isRequired,
      }).isRequired,
    })
  ).isRequired,
};

export default CustomCarousel;
