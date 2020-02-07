const Stripe = require('stripe');

const {
  STRIPE_SECRET_KEY_DEVELOPMENT,
  STRIPE_SECRET_KEY_PRODUCTION,
  APP_ENV,
} = process.env;

const stripeSecretKey =
  APP_ENV === 'production'
    ? STRIPE_SECRET_KEY_PRODUCTION
    : STRIPE_SECRET_KEY_DEVELOPMENT;

const config = {
  apiVersion: '2019-12-03',
};

const stripe = new Stripe(stripeSecretKey, config);

module.exports = stripe;
