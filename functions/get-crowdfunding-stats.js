const dotenv = require('dotenv');

dotenv.config();

const faunadb = require('faunadb');
const client = require('./utils/faunadbClient');

const q = faunadb.query;

const { APP_ENV } = process.env;

exports.handler = async () => {
  console.log(process.env);
  console.log(APP_ENV);
  const response = await client.query(
    q.Paginate(q.Match(q.Index('stats_by_environment'), APP_ENV))
  );

  console.log(response.data);
  const getStatsDataQuery = response.data.map(ref => {
    return q.Get(ref);
  });

  const stats = await client.query(getStatsDataQuery);
  console.log(stats);

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

  console.log(statsObj);

  return {
    statusCode: 200,
    body: JSON.stringify(statsObj),
  };
};
