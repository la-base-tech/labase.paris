import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import StatusContext from './Context';
import StatusProvider from './Provider';
import { getAmountFormatted } from '../../utils';

export { StatusContext as Context };
export { StatusProvider as Provider };

const WrapperStyled = styled.div`
  margin: auto;
`;

const ColumnStyled = styled.div``;

const ColumnTitleStyled = styled.div`
  font-weight: 900;
  font-size: 0.75rem;
  line-height: 1rem;

  @media (min-width: ${({ theme }) => theme.breakpointTablet}) {
    font-size: 0.9rem;
    line-height: 1rem;
  }
`;

const ColumnSubtitleStyled = styled.div`
  font-size: 0.8rem;
  line-height: 0.8rem;

  @media (min-width: ${({ theme }) => theme.breakpointTablet}) {
    font-size: 0.9rem;
    line-height: 0.9rem;
  }
`;

const ContainerStyled = styled.div`
  background: ${({ backgroundColor }) => backgroundColor};

  ${ColumnTitleStyled},
  ${ColumnSubtitleStyled} {
    color: ${({ textColor }) => textColor};
  }
`;

const Status = ({ backgroundColor, textColor, ...rest }) => {
  const { amount, contributors, dayLeftCount } = useContext(StatusContext);

  return (
    <ContainerStyled
      {...rest}
      id="crowdfunding"
      backgroundColor={backgroundColor}
      textColor={textColor}
    >
      <WrapperStyled className="container">
        <div className="columns is-mobile is-marginless">
          <ColumnStyled className="column is-paddingless">
            <ColumnTitleStyled>{getAmountFormatted(amount)}</ColumnTitleStyled>
            <ColumnSubtitleStyled>collectés</ColumnSubtitleStyled>
          </ColumnStyled>
          {dayLeftCount > 0 && (
            <ColumnStyled className="column is-paddingless">
              <ColumnTitleStyled>{dayLeftCount} jours</ColumnTitleStyled>
              <ColumnSubtitleStyled>pour participer</ColumnSubtitleStyled>
            </ColumnStyled>
          )}
          <ColumnStyled className="column is-paddingless">
            <ColumnTitleStyled>
              {contributors || '-'} personnes
            </ColumnTitleStyled>
            <ColumnSubtitleStyled>ont contribué</ColumnSubtitleStyled>
          </ColumnStyled>
        </div>
      </WrapperStyled>
    </ContainerStyled>
  );
};

Status.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
};

export default Status;
