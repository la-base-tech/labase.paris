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
  font-size: 1rem;
  line-height: 1rem;

  @media (min-width: ${({ theme }) => theme.breakpointTablet}) {
    font-size: 0.9rem;
    line-height: 1rem;
  }
`;

const ColumnSubtitleStyled = styled.div`
  font-size: 0.9rem;
  line-height: 0.9rem;
`;

const ProgressbarContainerStyled = styled.div`
  margin-top: 0.5rem !important;
`;

const ProgressBarStyled = styled.div`
  width: 100%;
  height: 8px;
  background: ${({ theme }) => theme.white};
  display: inline-block;

  &::after {
    content: '';
    display: block;
    background: ${({ theme }) => theme.green};
    width: ${({ value }) => value}%;
    height: 8px;
  }
`;

const ProgressBarValueColumnStyled = styled.div`
  padding-left: 0.5rem !important;
`;

const ProgressBarValueStyled = styled.div`
  display: inline-block;
  font-size: 0.8rem;
`;

const ContainerStyled = styled.div`
  background: ${({ backgroundColor }) => backgroundColor};

  ${ColumnTitleStyled}, 
  ${ColumnSubtitleStyled}, 
  ${ProgressBarValueStyled} {
    color: ${({ textColor }) => textColor};
  }
`;

const Status = ({ backgroundColor, textColor, ...rest }) => {
  const {
    objective,
    amount,
    contributors,
    percentage,
    dayLeftCount,
  } = useContext(StatusContext);

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
            <ColumnSubtitleStyled>
              sur {getAmountFormatted(objective)}
            </ColumnSubtitleStyled>
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
        <ProgressbarContainerStyled className="columns is-marginless is-mobile">
          <div className="column is-paddingless">
            <ProgressBarStyled value={Math.min(percentage, 100)} />
          </div>
          <ProgressBarValueColumnStyled className="column is-narrow is-paddingless">
            <ProgressBarValueStyled>{percentage}%</ProgressBarValueStyled>
          </ProgressBarValueColumnStyled>
        </ProgressbarContainerStyled>
      </WrapperStyled>
    </ContainerStyled>
  );
};

Status.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
};

export default Status;
