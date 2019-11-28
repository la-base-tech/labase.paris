const path = require('path');
const fs = require('fs');
const deepMap = require('deep-map');
const slash = require('slash');

const MEDIA_DIR = path.resolve(__dirname, '../../src');

function fileExists(filePath) {
  try {
    return fs.existsSync(filePath);
  } catch (err) {
    return false;
  }
}

function transformAbsoluteMediaFilePath(markdownAbsolutePath, value) {
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
  const relativePath = slash(
    path.relative(path.join(markdownAbsolutePath, '..'), potentialAbsolutePath)
  );

  return relativePath;
}

exports.onCreateNode = ({ node }) => {
  if (node.internal.type === `MarkdownRemark`) {
    // Deeply iterate through frontmatter data for absolute paths
    deepMap(
      node.frontmatter,
      transformAbsoluteMediaFilePath.bind(null, node.fileAbsolutePath),
      {
        inPlace: true,
      }
    );
  }
};
