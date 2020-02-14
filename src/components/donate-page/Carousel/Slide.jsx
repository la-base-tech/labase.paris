import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Slide } from '../../Carousel';
import BackgroundImage from '../../BackgroundImage';

const ContentStyled = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  color: ${({ theme }) => theme.white};
  display: flex;
  align-items: center;
  padding: 2rem 3rem 2rem 3rem;

  @media (min-width: ${({ theme }) => theme.breakpointTablet}) {
    padding: 2rem 15rem 2rem 5rem;
  }
`;

const MainTitleStyled = styled.div`
  font-weight: bold;
  margin-bottom: 1rem;
  font-size: 1.1rem;

  @media (min-width: ${({ theme }) => theme.breakpointTablet}) {
    font-size: 1rem;
  }
`;

const TextContainerStyled = styled.div`
  height: 8rem;

  @media (min-width: ${({ theme }) => theme.breakpointTablet}) {
    height: 11rem;
  }
`;

const TitleStyled = styled.div`
  font-weight: 900;
  margin-bottom: 0.5rem;
  font-size: 1.7rem;
  line-height: 1.7rem;

  @media (min-width: ${({ theme }) => theme.breakpointTablet}) {
    font-size: 3.7rem;
    line-height: 3.7rem;
  }
`;

const SubtitleStyled = styled.div`
  font-size: 1rem;

  @media (min-width: ${({ theme }) => theme.breakpointTablet}) {
    font-size: 1.5rem;
    line-height: 1.6rem;
  }
`;

const IndexStyled = styled.div`
  margin-top: 2rem;
`;

const CustomSlide = ({ title, subtitle, image, index, ...rest }) => {
  let indexFormatted = String(index + 1);
  if (indexFormatted.length < 2) {
    indexFormatted = `0${indexFormatted}`;
  }
  return (
    <Slide {...rest}>
      <BackgroundImage image={image}>
        <ContentStyled>
          <div>
            <MainTitleStyled>12 mois en 12 points</MainTitleStyled>
            <TextContainerStyled>
              <TitleStyled>{title}</TitleStyled>
              <SubtitleStyled>{subtitle}</SubtitleStyled>
            </TextContainerStyled>
            <IndexStyled>{indexFormatted} —–– 12</IndexStyled>
          </div>
        </ContentStyled>
      </BackgroundImage>
    </Slide>
  );
};

CustomSlide.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  image: PropTypes.shape({
    childImageSharp: PropTypes.shape({
      fluid: PropTypes.shape({}).isRequired,
    }).isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default CustomSlide;
