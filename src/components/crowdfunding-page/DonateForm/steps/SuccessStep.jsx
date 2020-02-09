import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeContext } from 'styled-components';
import AnimatedCheck from '../../../AnimatedCheck';
import StepContainer from './common/StepContainer';

const AnimatedCheckContainerStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 0.5rem;
  margin-bottom: 2rem;
`;

const TextStyled = styled.p``;

const AmountStyled = styled.span`
  display: block;
  font-weight: bold;
  font-size: 1.2rem;
`;

const SuccessStep = ({ data }) => {
  const theme = useContext(ThemeContext);

  return (
    <StepContainer title="Paiement validé">
      <AnimatedCheckContainerStyled>
        <AnimatedCheck checkColor={theme.yellow} circleColor={theme.black} />
      </AnimatedCheckContainerStyled>
      <TextStyled>
        Toute l’équipe de la base te remercie pour{' '}
        <AmountStyled>ton don de {data.amount}€ !</AmountStyled> Tu receveras
        sous peu un email de confirmation.
      </TextStyled>
      <img
        height="1"
        width="1"
        style={{ display: 'none' }}
        alt=""
        src="https://px.ads.linkedin.com/collect/?pid=1836012&conversionId=1836553&fmt=gif"
      />
    </StepContainer>
  );
};

SuccessStep.propTypes = {
  data: PropTypes.shape({
    amount: PropTypes.number.isRequired,
  }).isRequired,
};

export default SuccessStep;
