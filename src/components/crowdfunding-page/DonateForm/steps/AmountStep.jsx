import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { lighten } from 'polished';
import { useForm } from 'react-hook-form';
import StepContainer from './common/StepContainer';
import Input from './common/Input';

const FormStyled = styled.form``;

const ButtonsContainerStyled = styled.div`
  display: flex;
  margin-top: 1rem;
  margin-bottom: 3rem;
`;

const AmountButtonStyled = styled.button`
  flex-basis: 0;
  flex-grow: 1;
  flex-shrink: 1;
  background: transparent;
  color: ${({ theme }) => theme.black};
  text-align: center;
  font-size: 1rem;
  border: 1px solid ${({ theme }) => theme.black};
  padding: 0.25rem 0.5rem;
  @media (min-width: ${({ theme }) => theme.breakpointTablet}) {
    padding: 0.5rem 0.75rem;
  }
  font-weight: bold;

  &:not(:first-child) {
    margin-left: 0.5rem;

    @media (min-width: ${({ theme }) => theme.breakpointTablet}) {
      margin-left: 1rem;
    }
  }

  &:hover:not(.is-active) {
    cursor: pointer;
    transition: all 0.2s ease;
    background: ${({ theme }) => lighten(0.2, theme.yellow)};
  }

  &.is-active {
    background: ${({ theme }) => theme.black};
    color: ${({ theme }) => theme.yellow};
  }
`;

const InputControlStyled = styled.div`
  width: 100%;
  max-width: 200px;
  margin-top: 1rem;
  input {
    font-weight: bold;
  }
`;

const InputEuroStyled = styled.span`
  color: ${({ theme }) => theme.black} !important;
  font-weight: bold;
`;

const AmountStep = ({ data, onNext }) => {
  const fixedAmounts = [5, 10, 25, 50];

  const initialFixedAmount = fixedAmounts.includes(data.amount)
    ? data.amount
    : null;
  const initialCustomAmount = (!initialFixedAmount && data.amount) || null;

  const [fixedAmount, setFixedAmount] = useState(initialFixedAmount);

  const {
    register,
    handleSubmit,
    errors,
    getValues,
    triggerValidation,
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      customAmount: initialCustomAmount,
    },
  });

  const getData = () => {
    // Get the form data
    const values = getValues();

    // Prepare custom amount
    const customAmount = Number.parseInt(values.customAmount, 10);

    return {
      amount: fixedAmount || customAmount,
    };
  };

  const callOnNext = async () => {
    // No fixed amount, check if the form is valid
    if (!fixedAmount) {
      const isValid = await triggerValidation();
      if (!isValid) {
        return;
      }
    }
    const newData = getData();
    onNext(newData);
  };

  const onClickNext = () => {
    callOnNext();
  };

  const onClickFixedAmount = amount => {
    onNext({ amount });
  };

  const onCustomAmountFocus = () => {
    // Reset fixed amount
    setFixedAmount(null);
  };

  const submitForm = async () => {
    callOnNext();
  };

  return (
    <StepContainer
      title="Crowdfunding"
      buttonNext={{
        title: 'Continuer',
        onClick: onClickNext,
      }}
    >
      <FormStyled onSubmit={handleSubmit(submitForm)}>
        <div>Je participe à hauteur de</div>
        <ButtonsContainerStyled>
          {fixedAmounts.map(anAmount => (
            <AmountButtonStyled
              type="button"
              key={anAmount}
              className={`${fixedAmount === anAmount ? 'is-active' : ''}`}
              onClick={() => onClickFixedAmount(anAmount)}
            >
              {anAmount}€
            </AmountButtonStyled>
          ))}
        </ButtonsContainerStyled>
        <div>Laisse libre cours à ta générosité</div>

        <InputControlStyled className="control has-icons-right">
          <Input
            className={`input ${
              !fixedAmount && errors.customAmount ? 'has-error' : ''
            }`}
            type="number"
            name="customAmount"
            placeholder="15"
            ref={register({
              validate: value => {
                const reg = /^[0-9]+$/;
                if (!reg.test(value)) {
                  return false;
                }
                const number = +value;
                return number >= 1 && number < 10000;
              },
            })}
            onEnterKeyDown={submitForm}
            onFocus={onCustomAmountFocus}
            step="1"
            min="1"
            max="9999"
          />
          <InputEuroStyled className="icon is-small is-right">
            €
          </InputEuroStyled>
        </InputControlStyled>
      </FormStyled>
    </StepContainer>
  );
};

AmountStep.propTypes = {
  onNext: PropTypes.func.isRequired,
  data: PropTypes.shape({
    amount: PropTypes.number,
  }).isRequired,
};

export default AmountStep;
