import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  getAmountFormatted,
  getAmountWithTaxExemption,
} from '../../../../../utils';

const ContentStyled = styled.div`
  text-align: center;
  font-size: 0.8rem;
`;

const AmountStyled = styled.span`
  font-weight: bold;
`;

const TaxExemptionSummary = ({ amount, ...rest }) => {
  const amountFixed = amount || 0;
  const amountWithTaxExemption = getAmountWithTaxExemption(amountFixed);
  return (
    <ContentStyled {...rest}>
      Je fais un don de{' '}
      <AmountStyled>{getAmountFormatted(amount, false)}</AmountStyled>,<br />
      soit {getAmountFormatted(amountWithTaxExemption, true)} après déduction
      fiscale.
    </ContentStyled>
  );
};

TaxExemptionSummary.propTypes = {
  amount: PropTypes.number,
};

TaxExemptionSummary.defaultProps = {
  amount: null,
};

export default TaxExemptionSummary;
