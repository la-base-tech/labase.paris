const fetch = require('cross-fetch');

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  pluginsOptions
) => {
  const { createNode } = actions;
  let data;

  try {
    const response = await fetch(`${pluginsOptions.apiUrl}stats/crowdfunding`);
    data = await response.json();
  } catch (err) {
    throw new Error('Stats could not be fetched');
  }

  const nodeContent = JSON.stringify(data);

  const nodeMeta = {
    id: createNodeId('latest'),
    parent: null,
    children: [],
    internal: {
      type: 'LaBaseApiStatsCrowdfunding',
      mediaType: 'application/json',
      content: nodeContent,
      contentDigest: createContentDigest(data),
    },
  };

  const node = { ...data, ...nodeMeta };
  createNode(node);
};
