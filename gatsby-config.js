const dotenv = require('dotenv');

dotenv.config();

const MAIN_SITE_URL = 'https://labase.paris';
const LOCALHOST = 'http://localhost:8000'; // TODO: should automatically fetch that

const {
  URL: SITE_URL = MAIN_SITE_URL,
  DEPLOY_PRIME_URL = SITE_URL,
  CONTEXT: NODE_ENV = process.env.NODE_ENV || 'development',
} = process.env;

const isProduction = NODE_ENV === `production`;
const isDev = NODE_ENV === `development`;

// eslint-disable-next-line no-console
console.log(`building gatsby app in ${NODE_ENV} env `);

let siteUrl;
if (isDev) {
  siteUrl = LOCALHOST;
} else {
  siteUrl = isProduction ? SITE_URL : DEPLOY_PRIME_URL;
}

// eslint-disable-next-line no-console
console.log(`deploying on ${siteUrl}`);

const siteMetadata = {
  siteUrl,
  socialShareImage: '/images/social-share.jpg',
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
        develop: true, // Activates purging in npm run develop
        printRejected: false,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#fbeffc',
        theme_color: '#e30e9d',
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
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // Note: the plugin should be able to get the NODE_ENV but because Gatsby
        // override the NODE_ENV when building, it gets ignored.
        trackingId: isProduction
          ? process.env.GOOGLE_ANALYTICS_TRACKING_ID
          : null,
        anonymize: true,
        respectDNT: true,
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
  ],
};
