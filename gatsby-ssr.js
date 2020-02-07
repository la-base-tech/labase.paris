/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { StripeProvider } from './src/components/Stripe';
import theme from './src/styles/theme.module.scss';

export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={theme}>
    <StripeProvider apiKey={process.env.GATSBY_STRIPE_PUBLISHABLE_KEY}>
      {element}
    </StripeProvider>
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
