/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import smoothscroll from 'smoothscroll-polyfill';
import { StripeProvider } from './src/components/Stripe';
import theme from './src/styles/theme.module.scss';

export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={theme}>
    <StripeProvider apiKey={process.env.GATSBY_STRIPE_PUBLISHABLE_KEY}>
      {element}
    </StripeProvider>
  </ThemeProvider>
);

export const onClientEntry = async () => {
  // IntersectionObserver polyfill for gatsby-background-image (Safari, IE)
  if (typeof window.IntersectionObserver === `undefined`) {
    await import(`intersection-observer`);
  }
  smoothscroll.polyfill();
};
