/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from './src/styles/theme';

export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={theme}>{element}</ThemeProvider>
);

export const onRenderBody = ({ setPostBodyComponents }) => {
  return setPostBodyComponents([
    <div key="fb-root" id="fb-root" />,
    <script
      key="fb"
      async
      defer
      crossOrigin="anonymous"
      src="https://connect.facebook.net/fr_FR/sdk.js#xfbml=1&version=v5.0"
    />,
  ]);
};
