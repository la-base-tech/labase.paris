const MAIN_SITE_URL = 'https://labase.paris';
const LOCALHOST = 'http://localhost:8000'; // TODO: should automatically fetch that

const {
  URL: SITE_URL = MAIN_SITE_URL,
  DEPLOY_PRIME_URL = SITE_URL,
  CONTEXT: NODE_ENV = process.env.NODE_ENV || 'development',
} = process.env;

const isProduction = NODE_ENV === `production`;
const isDev = NODE_ENV === `development`;

let siteUrl;
if (isDev) {
  siteUrl = LOCALHOST;
} else {
  siteUrl = isProduction ? SITE_URL : DEPLOY_PRIME_URL;
}

const siteMetadata = {
  siteUrl,
  facebookImage: 'images/social_facebook.jpg',
  twitterImage: 'images/social_twitter.jpg',
};

module.exports = {
  siteMetadata,
  plugins: [
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/content`,
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
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
        fonts: ['Montserrat:400,600,700,800'],
        display: 'swap',
      },
    },
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        fileName: false,
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
