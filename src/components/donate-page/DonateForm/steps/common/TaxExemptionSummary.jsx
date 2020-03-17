import React from 'react';
import PropTypes from 'prop-types';
import { getAmountFormatted } from '../../utils';

const TAX_EXEMPTION = 0.66;

function getAmountWithTaxExemption(amount) {
  return amount * (1 - TAX_EXEMPTION);
}

const TaxExemptionSummary = ({ amount, ...rest }) => {
  const amountFixed = amount || 0;
  const amountWithTaxExemption = getAmountWithTaxExemption(amountFixed);
  return (
    <div {...rest}>
      <span>Soit {getAmountFormatted(amountWithTaxExemption, true)}</span> après
      déduction fiscale.
    </div>
  );
};

TaxExemptionSummary.propTypes = {
  amount: PropTypes.number,
};

TaxExemptionSummary.defaultProps = {
  amount: null,
};

export default TaxExemptionSummary;
