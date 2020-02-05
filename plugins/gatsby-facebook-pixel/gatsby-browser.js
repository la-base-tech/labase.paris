export const onRouteUpdate = (params, pluginOptions) => {
  if (pluginOptions.pixelId && typeof fbq === 'function') {
    window.fbq('track', 'ViewContent');
  }
};
