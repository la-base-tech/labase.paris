import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Extracted from https://codepen.io/haniotis/pen/KwvYLO
const SvgStyled = styled.svg`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  display: block;
  stroke-width: 2;
  stroke: ${props => props.checkColor};
  stroke-miterlimit: 10;
  box-shadow: inset 0px 0px 0px $green;
  animation: fill 0.4s ease-in-out 0.4s forwards,
    scale 0.3s ease-in-out 0.9s both;

  .checkmark__circle {
    stroke-dasharray: 166;
    stroke-dashoffset: 166;
    stroke-width: 2;
    stroke-miterlimit: 10;
    stroke: ${props => props.circleColor};
    fill: none;
    animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
  }

  .checkmark__check {
    transform-origin: 50% 50%;
    stroke-dasharray: 48;
    stroke-dashoffset: 48;
    animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
  }

  @keyframes stroke {
    100% {
      stroke-dashoffset: 0;
    }
  }

  @keyframes scale {
    0%,
    100% {
      transform: none;
    }
    50% {
      transform: scale3d(1.1, 1.1, 1);
    }
  }

  @keyframes fill {
    100% {
      box-shadow: inset 0px 0px 0px 30px ${props => props.circleColor};
    }
  }
`;

const AnimatedCheck = ({ checkColor, circleColor }) => (
  <SvgStyled
    className="checkmark"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 52 52"
    checkColor={checkColor}
    circleColor={circleColor}
  >
    <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
    <path
      className="checkmark__check"
      fill="none"
      d="M14.1 27.2l7.1 7.2 16.7-16.8"
    />
  </SvgStyled>
);

AnimatedCheck.propTypes = {
  checkColor: PropTypes.string.isRequired,
  circleColor: PropTypes.string.isRequired,
};

export default AnimatedCheck;
