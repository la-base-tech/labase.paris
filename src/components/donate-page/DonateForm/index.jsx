import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Elements } from '../../Stripe';
import Status from './Status';
import PaymentIntentManager from './PaymentIntentManager';
import StepsContainer from './StepsContainer';

const ContainerStyled = styled.div`
  width: 100%;
  max-width: 450px;
  margin: auto;
  overflow: hidden;
`;

const stripeFonts = [
  { cssSrc: 'https://fonts.googleapis.com/css?family=Montserrat:300' },
];

const DonateForm = () => (
  <ContainerStyled id="form">
    <Status />
    <PaymentIntentManager>
      <Elements locale="fr" fonts={stripeFonts}>
        <StepsContainer />
      </Elements>
    </PaymentIntentManager>
  </ContainerStyled>
);

DonateForm.propTypes = {};

export default DonateForm;
