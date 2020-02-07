import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { differenceInCalendarDays } from 'date-fns';
import api from '../../api';

const ContainerStyled = styled.div`
  background: ${({ theme }) => theme.black};
`;

const WrapperStyled = styled.div`
  margin: auto;
  padding: 1rem;

  @media (min-width: ${({ theme }) => theme.breakpointTablet}) {
    padding: 2rem;
  }
`;

const ColumnStyled = styled.div`
  text-align: center;
`;

const ColumnTitleStyled = styled.div`
  color: ${({ theme }) => theme.white};
  font-weight: 900;
  font-size: 1rem;
  line-height: 1rem;
  min-height: 2rem;
  display: flex;
  align-items: center;

  @media (min-width: ${({ theme }) => theme.breakpointTablet}) {
    font-size: 1.5rem;
    line-height: 1.5rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpointDesktop}) {
    font-size: 2rem;
    line-height: 2rem;
  }
`;

const ColumnSubtitleStyled = styled.div`
  color: ${({ theme }) => theme.white};
  font-size: 0.8rem;
  line-height: 1rem;
  min-height: 2rem;
  display: flex;
  align-items: center;

  @media (min-width: ${({ theme }) => theme.breakpointTablet}) {
    font-size: 1rem;
  }
`;

const ProgressBarContainerStyled = styled.div`
  text-align: center;
`;

const ProgressBarStyled = styled.div`
  width: 70%;
  height: 10px;
  background: ${({ theme }) => theme.white};
  display: inline-block;

  &::after {
    content: '';
    display: block;
    background: ${({ theme }) => theme.yellow};
    width: ${({ value }) => value}%;
    height: 10px;
  }
`;

const ProgressBarValueStyled = styled.div`
  display: inline-block;
  color: ${({ theme }) => theme.white};
  margin-left: 1rem;
`;

const Status = () => {
  const total = 100000;

  const [contributors, setContributors] = useState(null);
  const [amount, setAmount] = useState(null);

  useEffect(() => {
    api('stats/crowdfunding').then(data => {
      if (data.contributors) {
        setContributors(data.contributors);
      }
      if (data.amount) {
        setAmount(data.amount);
      }
    });
  }, []);

  const dateEnd = new Date(2020, 2, 22, 23, 59); // 22/03/2029 23:59

  const percentage = !amount ? 0 : Math.ceil((amount / total) * 100);
  const now = new Date();
  const dayLeftCount = differenceInCalendarDays(dateEnd, now);

  return (
    <ContainerStyled id="crowdfunding">
      <WrapperStyled className="container">
        <div className="columns is-mobile">
          <ColumnStyled className="column">
            <ColumnTitleStyled>{amount}€</ColumnTitleStyled>
            <ColumnSubtitleStyled>sur {total}€</ColumnSubtitleStyled>
          </ColumnStyled>
          <ColumnStyled className="column">
            <ColumnTitleStyled>{dayLeftCount} jours</ColumnTitleStyled>
            <ColumnSubtitleStyled>pour participer</ColumnSubtitleStyled>
          </ColumnStyled>
          <ColumnStyled className="column">
            <ColumnTitleStyled>
              {contributors || '-'} personnes
            </ColumnTitleStyled>
            <ColumnSubtitleStyled>ont contribué</ColumnSubtitleStyled>
          </ColumnStyled>
        </div>
        <ProgressBarContainerStyled>
          <ProgressBarStyled value={percentage} />
          <ProgressBarValueStyled>{percentage}%</ProgressBarValueStyled>
        </ProgressBarContainerStyled>
      </WrapperStyled>
    </ContainerStyled>
  );
};

export default Status;
