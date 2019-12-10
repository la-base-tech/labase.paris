import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const WidgetWrapperStyled = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;

  > iframe {
    height: 100%;
    width: 100%;
    display: flex;
  }
`;

const FacebookEventsWidget = ({ pageUrl }) => {
  const encodedPageUrl = encodeURIComponent(pageUrl);
  return (
    <WidgetWrapperStyled>
      <iframe
        src={`https://www.facebook.com/plugins/page.php?href=${encodedPageUrl}&tabs=events&small_header=true&adapt_container_width=true&hide_cover=true&show_facepile=false`}
        style={{
          border: 'none',
          overflow: 'hidden',
        }}
        allow="encrypted-media"
      />
    </WidgetWrapperStyled>
  );
};

FacebookEventsWidget.propTypes = {
  pageUrl: PropTypes.string.isRequired,
};

export default FacebookEventsWidget;
