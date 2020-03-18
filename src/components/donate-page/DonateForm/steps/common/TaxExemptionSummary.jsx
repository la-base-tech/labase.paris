import React from 'react';
import PropTypes from 'prop-types';
import {
  getAmountFormatted,
  getAmountWithTaxExemption,
} from '../../../../../utils';

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
