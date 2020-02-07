import React, { useState, useContext } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  AmountStep,
  InformationsStep,
  PaymentStep,
  SuccessStep,
} from './steps';
import StepTransition from './StepTransition';
import { Context as PaymentIntentContext } from './PaymentIntentManager';

const ContainerStyled = styled.div`
  background: ${({ theme }) => theme.yellow};
  overflow: hidden;
  position: relative;
`;

const StepTransitionStyled = styled(StepTransition)`
  width: 100%;
`;

const StepsContainer = () => {
  const [currentStepIndex, setStep] = useState(0);
  const [slideDirection, setSlideDirection] = useState('right');
  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    subscribe: false,
    amount: 5,
  });
  const { updatePaymentIntent } = useContext(PaymentIntentContext);
  const steps = [
    {
      component: AmountStep,
      props: {},
    },
    {
      component: InformationsStep,
      props: {},
    },
    {
      component: PaymentStep,
      props: {},
    },
    {
      component: SuccessStep,
      props: {},
    },
  ];

  const updateDataAndLoadNextStep = newData => {
    const updatedData = { ...data, ...newData };
    setData(updatedData);

    // Last step
    if (currentStepIndex === steps.length - 1) {
      return;
    }

    setSlideDirection('left');
    setStep(currentStepIndex + 1);
    updatePaymentIntent(updatedData);
  };

  const updateDataAndLoadPreviousStep = newData => {
    const updatedData = { ...data, ...newData };
    setData(updatedData);

    // First step
    if (currentStepIndex === 0) {
      return;
    }

    setSlideDirection('right');
    setStep(currentStepIndex - 1);
    updatePaymentIntent(updatedData);
  };

  const renderStep = () => {
    const step = steps[currentStepIndex];
    const StepComponent = step.component;

    return (
      <StepComponent
        {...step.props}
        data={data}
        onNext={updateDataAndLoadNextStep}
        onPrevious={updateDataAndLoadPreviousStep}
      />
    );
  };
  return (
    <ContainerStyled>
      <StepTransitionStyled
        id={`step-${currentStepIndex}`}
        direction={slideDirection}
      >
        {renderStep()}
      </StepTransitionStyled>
    </ContainerStyled>
  );
};

StepsContainer.propTypes = {};

export default StepsContainer;
