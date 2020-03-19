import React, { useContext } from 'react';
// import PropTypes from 'prop-types';
import styled, { ThemeContext } from 'styled-components';
import { Elements } from '../../Stripe';
import CrowdfundingStatus from '../../CrowdfundingStatus';
import PaymentIntentManager from './PaymentIntentManager';
import StepsContainer from './StepsContainer';

const ContainerStyled = styled.div`
  width: 100%;
  max-width: 450px;
  margin: auto;
  overflow: hidden;
`;

const CrowdfundingStatusStyled = styled(CrowdfundingStatus)`
  padding: 1rem;
`;

const stripeFonts = [
  { cssSrc: 'https://fonts.googleapis.com/css?family=Montserrat:300' },
];

const DonateForm = () => {
  const theme = useContext(ThemeContext);

  return (
    <ContainerStyled id="form">
      <CrowdfundingStatusStyled
        backgroundColor={theme.black}
        textColor={theme.white}
      />
      <PaymentIntentManager>
        <Elements locale="fr" fonts={stripeFonts}>
          <StepsContainer />
        </Elements>
      </PaymentIntentManager>
    </ContainerStyled>
  );
};

DonateForm.propTypes = {};

export default DonateForm;
