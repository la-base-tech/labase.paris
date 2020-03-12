import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getAmountFormatted } from '../../utils';

const TextStyled = styled.div`
  transition: all 0.23s ease;
  font-size: 0.7rem;
  margin-top: 1rem;
  text-align: right;
  line-height: 0.9rem;

  &.is-invisible {
    opacity: 0;
    margin-top: 0;
    height: 0;
  }
`;

const TAX_EXEMPTION = 0.66;

function getAmountWithTaxExemption(amount) {
  return amount * (1 - TAX_EXEMPTION);
}

const TaxExemptionSummary = ({ amount }) => {
  const amountFixed = amount || 0;
  const amountWithTaxExemption = getAmountWithTaxExemption(amountFixed);
  return (
    <TextStyled className={`${!amountFixed ? 'is-invisible' : ''}`}>
      *soit environ {getAmountFormatted(amountWithTaxExemption, true)} après
      déduction fiscale.
    </TextStyled>
  );
};

TaxExemptionSummary.propTypes = {
  amount: PropTypes.number,
};

TaxExemptionSummary.defaultProps = {
  amount: null,
};

export default TaxExemptionSummary;
