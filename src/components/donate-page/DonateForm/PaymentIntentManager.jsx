import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import { post as apiPost } from '../../../api';

export const Context = createContext({});

async function createOrUpdatePaymentIntent(data) {
  const response = await apiPost('stripe/payment-intent', data);
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
