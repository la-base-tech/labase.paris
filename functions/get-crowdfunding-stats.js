const dotenv = require('dotenv');

dotenv.config();

const faunadb = require('faunadb');
const client = require('./utils/faunadbClient');

const q = faunadb.query;

const appEnv = process.env.APP_ENV;

exports.handler = async () => {
  const response = await client.query(
    q.Paginate(q.Match(q.Index('stats_by_environment'), appEnv))
  );

  const getStatsDataQuery = response.data.map(ref => {
    return q.Get(ref);
  });

  const stats = await client.query(getStatsDataQuery);

  const statsObj = stats
    .map(stat => {
      return {
        name: stat.data.name,
        value: stat.data.value,
      };
    })
    .reduce((acc, { name, value }) => {
      acc[name] = value;
      return acc;
    }, {});

  return {
    statusCode: 200,
    body: JSON.stringify(statsObj),
  };
};
