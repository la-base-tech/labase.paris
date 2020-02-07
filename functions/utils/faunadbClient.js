const faunadb = require('faunadb');

const appEnv = process.env.APP_ENV;

const {
  FAUNADB_KEY_SECRET_DEVELOPMENT,
  FAUNADB_KEY_SECRET_PRODUCTION,
} = process.env;

const faunadbKeySecret =
  appEnv === 'production'
    ? FAUNADB_KEY_SECRET_PRODUCTION
    : FAUNADB_KEY_SECRET_DEVELOPMENT;

const client = new faunadb.Client({
  secret: faunadbKeySecret,
});

module.exports = client;
