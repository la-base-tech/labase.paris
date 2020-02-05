/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import smoothscroll from 'smoothscroll-polyfill';
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

export const onClientEntry = () => {
  // IntersectionObserver polyfill for gatsby-background-image (Safari, IE)
  if (typeof window.IntersectionObserver === `undefined`) {
    import(`intersection-observer`);
  }
  smoothscroll.polyfill();
};
