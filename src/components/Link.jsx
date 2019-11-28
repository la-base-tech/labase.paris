import React from 'react';
import PropTypes from 'prop-types';
import GatsbyLink from 'gatsby-link';

function scrollToElement(elementId) {
  const el = document.querySelector(elementId);
  if (!el) {
    return;
  }
  el.scrollIntoView({
    behavior: 'smooth',
  });
}

const BaseLink = ({ children, ...rest }) => <a {...rest}>{children}</a>;

BaseLink.propTypes = {
  children: PropTypes.node.isRequired,
};

const EnhancedLink = ({ href, children, download, onClick, ...rest }) => {
  const isAnchor = href.substr(0, 1) === '#';

  if (isAnchor) {
    const handleClick = e => {
      e.preventDefault();
      if (onClick) {
        onClick(e);
      }
      scrollToElement(href);
    };

    return (
      <BaseLink href={href} {...rest} onClick={handleClick}>
        {children}
      </BaseLink>
    );
  }

  const isInternal = href.substr(0, 1) === '/';

  if (!download && isInternal) {
    return (
      <GatsbyLink to={href} onClick={onClick} {...rest}>
        {children}
      </GatsbyLink>
    );
  }

  // Is external link or download
  return (
    <BaseLink
      href={href}
      onClick={onClick}
      {...rest}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </BaseLink>
  );
};

EnhancedLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  download: PropTypes.bool,
  onClick: PropTypes.func,
};

EnhancedLink.defaultProps = {
  download: false,
  onClick: null,
};

export default EnhancedLink;
