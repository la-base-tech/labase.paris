const path = require('path');
const fs = require('fs');
const { createFilePath } = require('gatsby-source-filesystem');
const deepMap = require('deep-map');

const MEDIA_DIR = './src';

function fileExists(filePath) {
  try {
    return fs.existsSync(filePath);
  } catch (err) {
    return false;
  }
}

function transformAbsoluteMediaFilePath(nodeAbsoluteFilePath, value) {
  // Not a string and not an absolute path
  if (
    typeof value !== 'string' ||
    value.substr(0, 1) !== '/' ||
    value === '/'
  ) {
    return value;
  }

  // Generate absolute path
  const potentialAbsolutePath = path.resolve(
    __dirname,
    path.join(MEDIA_DIR, value)
  );

  // File does not exist
  if (!fileExists(potentialAbsolutePath)) {
    return value;
  }

  // Generate relative path from node file
  const relativePath = path.relative(
    path.join(nodeAbsoluteFilePath, '..'),
    potentialAbsolutePath
  );

  return relativePath;
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    // Deeply iterate through frontmatter data for absolute paths
    deepMap(
      node.frontmatter,
      transformAbsoluteMediaFilePath.bind(null, node.fileAbsolutePath),
      {
        inPlace: true,
      }
    );

    const filePath = createFilePath({ node, getNode });

    const parts = filePath.split('/').filter(part => !!part);

    const type = parts.shift();
    const isPage = type === 'pages';
    const name = `${isPage ? 'page-' : ''}${parts.join('-') || 'index'}`;

    // Add field name
    createNodeField({
      name: `name`,
      node,
      value: name,
    });

    // Add field isPage
    createNodeField({
      name: `isPage`,
      node,
      value: isPage,
    });
  }
};
