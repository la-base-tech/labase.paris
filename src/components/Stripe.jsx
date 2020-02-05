import React, { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  StripeProvider as StripeProviderInner,
  Elements as ElementsInner,
  injectStripe,
} from 'react-stripe-elements';

export const StripeProvider = ({ children, apiKey }) => {
  const [stripe, setStripe] = useState(null);

  const initializeStripe = () => {
    setStripe(window.Stripe(apiKey));
  };

  useEffect(() => {
    if (window.Stripe) {
      initializeStripe();
    } else {
      // Otherwise wait for Stripe script to load
      document.querySelector('#stripe-js').addEventListener('load', () => {
        initializeStripe();
      });
    }
  }, []);

  return <StripeProviderInner stripe={stripe}>{children}</StripeProviderInner>;
};

StripeProvider.propTypes = {
  children: PropTypes.node.isRequired,
  apiKey: PropTypes.string.isRequired,
};

const HookContext = createContext();

const HookProvider = injectStripe(({ stripe, elements, children }) => (
  <HookContext.Provider value={{ stripe, elements }}>
    {children}
  </HookContext.Provider>
));

export const Elements = ({ children, ...rest }) => (
  <ElementsInner {...rest}>
    <HookProvider>{children}</HookProvider>
  </ElementsInner>
);

Elements.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useStripe = () => useContext(HookContext);
