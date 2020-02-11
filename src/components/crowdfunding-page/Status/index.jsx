import React, { useContext } from 'react';
import styled from 'styled-components';
import StatusContext from './Context';
import StatusProvider from './Provider';

export { StatusContext as Context };
export { StatusProvider as Provider };

const ContainerStyled = styled.div`
  background: ${({ theme }) => theme.black};
  padding: 1rem;
`;

const WrapperStyled = styled.div`
  margin: auto;
`;

const ColumnStyled = styled.div``;

const ColumnTitleStyled = styled.div`
  color: ${({ theme }) => theme.white};
  font-weight: 900;
  font-size: 0.6rem;
  line-height: 1rem;

  @media (min-width: ${({ theme }) => theme.breakpointTablet}) {
    font-size: 0.9rem;
    line-height: 1rem;
  }
`;

const ColumnSubtitleStyled = styled.div`
  color: ${({ theme }) => theme.white};
  font-size: 0.6rem;
  line-height: 1rem;

  @media (min-width: ${({ theme }) => theme.breakpointTablet}) {
    font-size: 0.8rem;
    line-height: 1rem;
  }
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
    background: ${({ theme }) => theme.yellow};
    width: ${({ value }) => value}%;
    height: 8px;
  }
`;

const ProgressBarValueColumnStyled = styled.div`
  padding-left: 0.5rem !important;
`;

const ProgressBarValueStyled = styled.div`
  display: inline-block;
  color: ${({ theme }) => theme.white};
  font-size: 0.6rem;

  @media (min-width: ${({ theme }) => theme.breakpointTablet}) {
    font-size: 0.8rem;
  }
`;

const Status = () => {
  const {
    objective,
    amount,
    contributors,
    percentage,
    dayLeftCount,
  } = useContext(StatusContext);

  return (
    <ContainerStyled id="crowdfunding">
      <WrapperStyled className="container">
        <div className="columns is-mobile is-marginless">
          <ColumnStyled className="column is-paddingless">
            <ColumnTitleStyled>{amount}€</ColumnTitleStyled>
            <ColumnSubtitleStyled>sur {objective}€</ColumnSubtitleStyled>
          </ColumnStyled>
          <ColumnStyled className="column is-paddingless">
            <ColumnTitleStyled>{dayLeftCount} jours</ColumnTitleStyled>
            <ColumnSubtitleStyled>pour participer</ColumnSubtitleStyled>
          </ColumnStyled>
          <ColumnStyled className="column is-paddingless">
            <ColumnTitleStyled>
              {contributors || '-'} personnes
            </ColumnTitleStyled>
            <ColumnSubtitleStyled>ont contribué</ColumnSubtitleStyled>
          </ColumnStyled>
        </div>
        <ProgressbarContainerStyled className="columns is-marginless is-mobile">
          <div className="column is-paddingless">
            <ProgressBarStyled value={percentage} />
          </div>
          <ProgressBarValueColumnStyled className="column is-narrow is-paddingless">
            <ProgressBarValueStyled>{percentage}%</ProgressBarValueStyled>
          </ProgressBarValueColumnStyled>
        </ProgressbarContainerStyled>
      </WrapperStyled>
    </ContainerStyled>
  );
};

export default Status;
