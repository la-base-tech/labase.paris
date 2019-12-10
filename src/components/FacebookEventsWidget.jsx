import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useDimensions from 'react-use-dimensions';

const IframeWrapperStyled = styled.div`
  height: 100%;
  width: 100%;
  display: flex;

  iframe {
    height: 100%;
    width: 100%;
    max-width: 500px;
    margin: auto;
  }
`;

const FacebookEventsWidget = ({ pageUrl }) => {
  const [ref, { width }] = useDimensions();
  const encodedPageUrl = encodeURIComponent(pageUrl);
  const iframeWidth = width && Number.parseInt(width, 10);

  return (
    <IframeWrapperStyled ref={ref}>
      {iframeWidth && (
        <iframe
          key={iframeWidth}
          src={`https://www.facebook.com/plugins/page.php?href=${encodedPageUrl}&tabs=events&small_header=true&adapt_container_width=true&hide_cover=true&show_facepile=false&width=${iframeWidth}`}
          style={{
            border: 'none',
            overflow: 'hidden',
          }}
          allow="encrypted-media"
        />
      )}
    </IframeWrapperStyled>
  );
};

FacebookEventsWidget.propTypes = {
  pageUrl: PropTypes.string.isRequired,
};

export default FacebookEventsWidget;
