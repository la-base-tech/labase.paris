/* eslint-disable react/no-danger */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';

export const onRenderBody = (
  { setHeadComponents, setPostBodyComponents },
  { trackingId }
) => {
  if (!trackingId) {
    return null;
  }

  // Lighthouse recommends pre-connecting to google analytics
  setHeadComponents([
    <link
      rel="preconnect dns-prefetch"
      key="preconnect-gtag"
      href="https://www.googletagmanager.com"
    />,
  ]);

  return setPostBodyComponents([
    <script
      key="gatsby-gtag"
      async
      src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}
    />,
    <script
      key="gatsby-gtag-inline"
      dangerouslySetInnerHTML={{
        __html: `
        // Anonymize IP
        function gaOptout(){document.cookie=disableStr+'=true; expires=Thu, 31 Dec 2099 23:59:59 UTC;path=/',window[disableStr]=!0}var gaProperty='${trackingId}',disableStr='ga-disable-'+gaProperty;document.cookie.indexOf(disableStr+'=true')>-1&&(window[disableStr]=!0);
        // Restpect Do Not Track
        const dnt = !(navigator.doNotTrack == "1" || window.doNotTrack == "1");
        if (dnt) {
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer && window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${trackingId}', {
            // Prevent duplicate or excluded pageview events being emitted on initial load of page by the "config" command
            // https://developers.google.com/analytics/devguides/collection/gtagjs/#disable_pageview_tracking          
            send_page_view: false,
          });
        }
        `,
      }}
    />,
  ]);
};
