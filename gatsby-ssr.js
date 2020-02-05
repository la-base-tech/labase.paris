/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { StripeProvider } from './src/components/Stripe';
import theme from './src/styles/theme.module.scss';

const stripePublishableKey =
  process.env.APP_ENV === 'production'
    ? process.env.GATSBY_STRIPE_PUBLISHABLE_KEY_PRODUCTION
    : process.env.GATSBY_STRIPE_PUBLISHABLE_KEY_DEVELOPMENT;

export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={theme}>
    <StripeProvider apiKey={stripePublishableKey}>{element}</StripeProvider>
  </ThemeProvider>
);

export const onRenderBody = ({ setPostBodyComponents }) => {
  return setPostBodyComponents([
    <script
      id="stripe-js"
      key="gatsby-plugin-stripe"
      src="https://js.stripe.com/v3/"
      async
    />,
  ]);
};
