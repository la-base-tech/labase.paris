const Stripe = require('stripe');

const appEnv = process.env.APP_ENV;

const {
  STRIPE_SECRET_KEY_DEVELOPMENT,
  STRIPE_SECRET_KEY_PRODUCTION,
} = process.env;

const stripeSecretKey =
  appEnv === 'production'
    ? STRIPE_SECRET_KEY_PRODUCTION
    : STRIPE_SECRET_KEY_DEVELOPMENT;

const config = {
  apiVersion: '2019-12-03',
};

const stripe = new Stripe(stripeSecretKey, config);

module.exports = stripe;
