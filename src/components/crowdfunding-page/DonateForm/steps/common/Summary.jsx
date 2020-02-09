import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TextStyled = styled.div`
  transition: all 0.23s ease;
  font-size: 0.8rem;
  margin-top: 1rem;
  height: 2rem;
  b {
    font-size: 0.9rem;
  }

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

export function getAmountFormatted(amount, withFractionDigits) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: withFractionDigits ? 2 : 0,
  }).format(amount);
}

const Summary = ({ amount }) => {
  const amountFixed = amount || 0;
  const amountWithTaxExemption = getAmountWithTaxExemption(amountFixed);
  return (
    <TextStyled className={`${!amountFixed ? 'is-invisible' : ''}`}>
      Je fais un <b>don de {getAmountFormatted(amountFixed, false)}</b>,<br />
      <b>soit {getAmountFormatted(amountWithTaxExemption, true)}</b> après
      déduction fiscale.
    </TextStyled>
  );
};

Summary.propTypes = {
  amount: PropTypes.number,
};

Summary.defaultProps = {
  amount: null,
};

export default Summary;
