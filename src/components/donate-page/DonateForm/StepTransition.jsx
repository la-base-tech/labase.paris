import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const timeout = 350;

const TransitionGroupStyled = styled(TransitionGroup)`
  .slide-enter-active,
  .slide-exit-active {
    transition: all ${timeout}ms ease-in-out;
  }

  &.left .slide-enter {
    opacity: 0;
    transform: translateX(50%);
  }
  &.left .slide-enter-active {
    transform: translateX(0);
    opacity: 1;
  }
  &.left .slide-exit {
    position: absolute;
    top: 0;
    transform: translateX(0);
    opacity: 1;
  }
  &.left .slide-exit-active {
    opacity: 0;
    transform: translateX(-30%);
  }

  &.right .slide-enter {
    opacity: 0;
    transform: translateX(-50%);
  }
  &.right .slide-enter-active {
    transform: translateX(0);
    opacity: 1;
  }
  &.right .slide-exit {
    position: absolute;
    top: 0;
    transform: translateX(0);
    opacity: 1;
  }
  &.right .slide-exit-active {
    opacity: 0;
    transform: translateX(30%);
  }
`;

const StepTransitionWrapperStyled = styled.div`
  width: 100%;
`;

const StepTransition = ({ children, id, direction }) => (
  <TransitionGroupStyled className={direction}>
    <CSSTransition
      key={id}
      classNames="slide"
      timeout={{
        enter: timeout,
        exit: timeout,
      }}
    >
      <StepTransitionWrapperStyled>{children}</StepTransitionWrapperStyled>
    </CSSTransition>
  </TransitionGroupStyled>
);

StepTransition.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  direction: PropTypes.string.isRequired,
};

export default StepTransition;
