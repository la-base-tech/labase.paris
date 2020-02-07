import React from 'react';
import PropTypes from 'prop-types';
import GatsbyLink from 'gatsby-link';

function scrollToElement(elementId, targetMiddle) {
  const el = document.querySelector(elementId);
  if (!el) {
    return;
  }

  const { scrollY } = window;
  const elementRect = el.getBoundingClientRect();
  let newScrollPosition;

  // Get navbar height
  const navbar = document.getElementById('navbar');

  // Scroll to middle
  if (targetMiddle && elementRect.height < window.innerHeight) {
    let windowHeight = window.innerHeight;

    newScrollPosition = scrollY + elementRect.top;

    if (navbar) {
      newScrollPosition -= navbar.offsetHeight;
      windowHeight -= navbar.offsetHeight;
    }

    newScrollPosition -= windowHeight / 2 - elementRect.height / 2;

    // Scroll to top
  } else {
    newScrollPosition = scrollY + elementRect.top;

    if (navbar) {
      newScrollPosition -= navbar.offsetHeight;
    }
  }

  window.scroll({ top: newScrollPosition, behavior: 'smooth' });
}

const BaseLink = ({ children, ...rest }) => <a {...rest}>{children}</a>;

BaseLink.propTypes = {
  children: PropTypes.node.isRequired,
};

const EnhancedLink = ({
  href,
  children,
  download,
  onClick,
  targetMiddle,
  ...rest
}) => {
  const isAnchor = href.substr(0, 1) === '#';

  if (isAnchor) {
    const handleClick = e => {
      e.preventDefault();
      if (onClick) {
        onClick(e);
      }
      scrollToElement(href, targetMiddle);
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
  targetMiddle: PropTypes.bool,
};

EnhancedLink.defaultProps = {
  download: false,
  onClick: null,
  targetMiddle: null,
};

export default EnhancedLink;
