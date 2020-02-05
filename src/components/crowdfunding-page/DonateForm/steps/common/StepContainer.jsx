/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ContainerStyled = styled.div`
  padding: 1rem;
`;

const ContentContainer = styled.div`
  height: 230px;
`;

const TitleStyled = styled.h3`
  font-weight: 900;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
`;

const ButtonsContainerStyled = styled.div`
  margin-top: 1.5rem;
`;

const MainButtonStyled = styled.button`
  font-weight: bold;
  font-size: 0.9rem;
  padding-left: 1.5em;
  padding-right: 1.5em;

  @media (min-width: ${({ theme }) => theme.breakpointTablet}) {
    padding-left: 2em;
    padding-right: 2em;
  }

  &.is-loading::after {
    border-color: transparent transparent ${({ theme }) => theme.yellow}
      ${({ theme }) => theme.yellow} !important;
  }
`;

const SecondaryButtonStyled = styled.button`
  font-size: 0.9rem;
  font-weight: bold;
  border: 1px solid ${({ theme }) => theme.black} !important;
`;

const StepContainer = ({ title, children, buttonPrevious, buttonNext }) => (
  <ContainerStyled>
    {title && <TitleStyled>{title}</TitleStyled>}

    <ContentContainer>{children}</ContentContainer>

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
                {buttonNext.title}
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
};

StepContainer.defaultProps = {
  title: null,
  buttonPrevious: null,
  buttonNext: null,
};

export default StepContainer;
