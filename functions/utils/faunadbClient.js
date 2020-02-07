const faunadb = require('faunadb');

const {
  FAUNADB_KEY_SECRET_DEVELOPMENT,
  FAUNADB_KEY_SECRET_PRODUCTION,
  APP_ENV,
} = process.env;

const faunadbKeySecret =
  APP_ENV === 'production'
    ? FAUNADB_KEY_SECRET_PRODUCTION
    : FAUNADB_KEY_SECRET_DEVELOPMENT;

const client = new faunadb.Client({
  secret: faunadbKeySecret,
});

module.exports = client;
