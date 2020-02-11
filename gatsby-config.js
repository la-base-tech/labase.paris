const dotenv = require('dotenv');

dotenv.config();

const MAIN_SITE_URL = 'https://labase.paris';
const LOCALHOST = 'http://localhost:8000'; // TODO: should automatically fetch that

const {
  NODE_ENV = 'development',
  APP_ENV = 'development',
  URL: SITE_URL = MAIN_SITE_URL,
  DEPLOY_PRIME_URL = SITE_URL,
} = process.env;

const isProduction = APP_ENV === `production`;
const isDev = NODE_ENV === `development`;

// eslint-disable-next-line no-console
console.log(`NODE_ENV ${NODE_ENV}`);

// eslint-disable-next-line no-console
console.log(`APP_ENV ${APP_ENV}`);

// eslint-disable-next-line no-console
console.log(`isProduction ${isProduction}`);

// eslint-disable-next-line no-console
console.log(`isDev ${isDev}`);

let siteUrl;
if (isDev) {
  siteUrl = LOCALHOST;
} else {
  siteUrl = isProduction ? SITE_URL : DEPLOY_PRIME_URL;
}

// Prepare API URL
process.env.GATSBY_API_URL = isProduction
  ? process.env.GATSBY_API_URL_PRODUCTION
  : process.env.GATSBY_API_URL_DEVELOPMENT;

// Prepare Stripe Key
process.env.GATSBY_STRIPE_PUBLISHABLE_KEY = isProduction
  ? process.env.GATSBY_STRIPE_PUBLISHABLE_KEY_PRODUCTION
  : process.env.GATSBY_STRIPE_PUBLISHABLE_KEY_DEVELOPMENT;

// eslint-disable-next-line no-console
console.log(`deploying on ${siteUrl}`);

const siteMetadata = {
  siteUrl,
  socialShareImage: '/images/social.jpg',
};

module.exports = {
  siteMetadata,
  plugins: [
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/images`,
      },
    },
    {
      resolve: 'gatsby-transformer-yaml',
      options: {
        typeName: 'Yaml',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content`,
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-styled-components',
      options: {
        // By default, the displayName of a component will be prefixed with the filename
        // in order to make the component name as unique as possible.
        fileName: false,
        displayName: false,
      },
    },
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-plugin-purgecss', // purges all unused/unreferenced css rules
      options: {
        develop: false, // Activates purging in npm run develop
        printRejected: false,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#000000',
        theme_color: '#FFE500',
        display: 'minimal-ui',
        icon: 'src/images/icon.png', // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: ['Montserrat:300,600,800,900'],
        display: 'swap',
      },
    },
    {
      resolve: 'gatsby-gtag',
      options: {
        trackingId: isProduction
          ? process.env.GOOGLE_ANALYTICS_TRACKING_ID
          : null,
      },
    },
    {
      resolve: 'gatsby-facebook-pixel',
      options: {
        pixelId: isProduction
          ? process.env.FACEBOOK_PIXEL_ID
          : process.env.FACEBOOK_PIXEL_ID,
      },
    },
    {
      resolve: 'gatsby-plugin-layout',
      options: {
        component: require.resolve('./src/components/Layout.jsx'),
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {},
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {},
    },
  ],
};
