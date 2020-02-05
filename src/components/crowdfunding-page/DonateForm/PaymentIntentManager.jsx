import React, { createContext } from 'react';
import PropTypes from 'prop-types';

const FUNCTION_ENDPOINT = '/.netlify/functions/stripe-payment-intent';

export const Context = createContext({});

async function createOrUpdatePaymentIntent(data) {
  const result = await fetch(FUNCTION_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: JSON.stringify(data),
  });
  const response = await result.json();
  return response.paymentIntent;
}

const PaymentIntentManager = ({ children }) => {
  let promise = null;

  const updatePaymentIntent = async params => {
    let paymentIntent;
    if (promise) {
      paymentIntent = await promise;
    }
    promise = createOrUpdatePaymentIntent({
      paymentIntentId: paymentIntent ? paymentIntent.id : null,
      params,
    });
    return promise;
  };

  const resetPaymentIntent = () => {
    promise = null;
  };

  const getPaymentIntent = () => {
    return promise;
  };

  return (
    <Context.Provider
      value={{ updatePaymentIntent, getPaymentIntent, resetPaymentIntent }}
    >
      {children}
    </Context.Provider>
  );
};

PaymentIntentManager.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PaymentIntentManager;
