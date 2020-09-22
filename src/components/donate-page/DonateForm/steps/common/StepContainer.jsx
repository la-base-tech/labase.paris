/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import StepTitle from './StepTitle';
import { getAmountFormatted } from '../../../../../utils';

const ContainerStyled = styled.div`
  padding: 1rem;
`;

const ContentContainer = styled.div`
  min-height: 240px;
  display: flex;
  align-items: center;

  > div {
    width: 100%;
  }
`;

const ButtonsContainerStyled = styled.div`
  margin-top: 1rem;
`;

const MainButtonStyled = styled.button`
  font-weight: bold;
  font-size: 0.9rem;
  padding-left: 1em;
  padding-right: 1em;

  &:hover {
    opacity: 0.7;
  }

  @media (min-width: ${({ theme }) => theme.breakpointTablet}) {
    padding-left: 2em;
    padding-right: 2em;
  }

  &&.is-loading::after {
    border-color: transparent transparent ${({ theme }) => theme.yellow}
      ${({ theme }) => theme.yellow} !important;
  }
`;

const SecondaryButtonStyled = styled.button`
  font-size: 0.8rem;
  font-weight: bold;
  padding-left: 0;
  padding-right: 0;
`;

const StepContainer = ({
  title,
  children,
  buttonPrevious,
  buttonNext,
  amount,
}) => (
  <ContainerStyled>
    {title && <StepTitle>{title}</StepTitle>}

    <ContentContainer>
      <div>{children}</div>
    </ContentContainer>

    {(buttonPrevious || buttonNext) && (
      <ButtonsContainerStyled>
        <div className="columns is-mobile">
          {buttonPrevious && (
            <div className="column has-text-left">
              <SecondaryButtonStyled
                className="button is-primary"
                onClick={buttonPrevious.onClick}
                type="button"
              >
                {buttonPrevious.title}
              </SecondaryButtonStyled>
            </div>
          )}
          <div
            className={`column ${
              buttonPrevious ? 'has-text-right' : 'has-text-right'
            }`}
          >
            {buttonNext && (
              <MainButtonStyled
                className={`button is-primary is-inverted ${
                  buttonNext.isLoading ? 'is-loading' : ''
                }`}
                onClick={buttonNext.onClick}
                type={buttonNext.isSubmit ? 'submit' : 'button'}
              >
                Je donne {amount && <>{getAmountFormatted(amount)}</>}
              </MainButtonStyled>
            )}
          </div>
        </div>
      </ButtonsContainerStyled>
    )}
  </ContainerStyled>
);

StepContainer.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  buttonPrevious: PropTypes.shape({
    title: PropTypes.string,
    onClick: PropTypes.func,
  }),
  buttonNext: PropTypes.shape({
    title: PropTypes.string,
    onClick: PropTypes.func,
    isSubmit: PropTypes.bool,
    isLoading: PropTypes.bool,
  }),
  amount: PropTypes.number,
};

StepContainer.defaultProps = {
  title: null,
  buttonPrevious: null,
  buttonNext: null,
  amount: null,
};

export default StepContainer;
