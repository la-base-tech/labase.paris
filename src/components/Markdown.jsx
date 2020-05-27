import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown/with-html';

const ReactMarkdownStyled = styled(ReactMarkdown)`
  a {
    color: ${props => props.theme.black};
    border-bottom: 1px solid ${props => props.theme.yellow};

    &:hover {
      background-color: ${props => props.theme.yellow};
    }
  }

  mark {
    background-color: ${props => props.theme.yellow};
  }

  p:not(:first-child) {
    margin-top: 1rem;
  }
`;

const Markdown = ({ children, ...rest }) => (
  <ReactMarkdownStyled
    {...rest}
    source={children}
    escapeHtml={false}
    linkTarget="_blank"
  />
);

Markdown.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Markdown;
