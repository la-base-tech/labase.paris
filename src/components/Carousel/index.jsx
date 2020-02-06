import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactInterval from 'react-interval';
import { useInView } from 'react-intersection-observer';
import Slide from './Slide';
import Context from './Context';

export { Slide, Context };

const Carousel = ({ timeout, slideCount, children }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [ref, inView] = useInView({
    threshold: 0.75,
  });

  if (!inView && !autoPlay) {
    setAutoPlay(true);
  }

  const loadSlide = async index => {
    setCurrentSlideIndex(index);
    setAutoPlay(false);
  };

  const loadNextSlide = manual => {
    if (manual) {
      setAutoPlay(false);
    }
    if (currentSlideIndex === slideCount - 1) {
      setCurrentSlideIndex(0);
      return;
    }
    const nextIndex = Math.min(slideCount - 1, currentSlideIndex + 1);
    setCurrentSlideIndex(nextIndex);
  };

  const loadPreviousSlide = manual => {
    if (manual) {
      setAutoPlay(false);
    }
    if (currentSlideIndex === 0) {
      setCurrentSlideIndex(slideCount - 1);
      return;
    }
    const previousIndex = currentSlideIndex - 1;
    setCurrentSlideIndex(previousIndex);
  };

  return (
    <Context.Provider
      value={{ currentSlideIndex, loadSlide, loadNextSlide, loadPreviousSlide }}
    >
      {inView && (
        <ReactInterval
          timeout={timeout}
          enabled={autoPlay}
          callback={loadNextSlide}
        />
      )}
      <div ref={ref}>{children}</div>
    </Context.Provider>
  );
};

Carousel.propTypes = {
  children: PropTypes.node.isRequired,
  slideCount: PropTypes.number.isRequired,
  timeout: PropTypes.number.isRequired,
};

export default Carousel;
