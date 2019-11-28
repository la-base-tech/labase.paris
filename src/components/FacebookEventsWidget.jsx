import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const WidgetWrapperStyled = styled.div`
  width: 100%;
  overflow: hidden;
`;

const FacebookEventsWidget = ({ pageUrl }) => (
  <WidgetWrapperStyled>
    <div
      className="fb-page"
      data-href={pageUrl}
      data-tabs="events"
      data-width=""
      data-height=""
      data-small-header="true"
      data-adapt-container-width="true"
      data-hide-cover="true"
      data-show-facepile="false"
    >
      <blockquote cite={pageUrl} className="fb-xfbml-parse-ignore">
        <a href={pageUrl}>La base</a>
      </blockquote>
    </div>
  </WidgetWrapperStyled>
);

FacebookEventsWidget.propTypes = {
  pageUrl: PropTypes.string.isRequired,
};

export default FacebookEventsWidget;
