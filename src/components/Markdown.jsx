import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown/with-html';

const ReactMarkdownStyled = styled(ReactMarkdown)`
  mark {
    background-color: ${props => props.theme.yellow};
  }

  p:not(:first-child) {
    margin-top: 1rem;
  }
`;

const Markdown = ({ children, ...rest }) => (
  <ReactMarkdownStyled {...rest} source={children} escapeHtml={false} />
);

Markdown.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Markdown;
