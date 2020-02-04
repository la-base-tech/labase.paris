const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'Yaml') {
    const filePath = createFilePath({ node, getNode });

    const parts = filePath.split('/').filter(part => !!part);

    const type = parts.shift();
    const isPage = type === 'pages';
    const name = `${isPage ? 'page-' : ''}${parts.join('-') || 'index'}`;

    // Add field name
    createNodeField({
      name: 'name',
      node,
      value: name,
    });

    // Add field isPage
    createNodeField({
      name: 'isPage',
      node,
      value: isPage,
    });
  }
};
