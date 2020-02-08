export const onRouteUpdate = ({ location }, { trackingId }) => {
  if (typeof gtag !== 'function') {
    return null;
  }

  // wrap inside a timeout to make sure react-helmet is done with its changes
  // https://github.com/gatsbyjs/gatsby/issues/11592
  const sendPageView = () => {
    const pagePath = location
      ? location.pathname + location.search + location.hash
      : undefined;
    window.gtag('config', trackingId, {
      page_path: pagePath,
      anonymize_ip: true,
    });
  };

  if ('requestAnimationFrame' in window) {
    requestAnimationFrame(() => {
      requestAnimationFrame(sendPageView);
    });
  } else {
    // simulate 2 rAF calls
    setTimeout(sendPageView, 32);
  }

  return null;
};
