import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { lighten } from 'polished';
import { useForm } from 'react-hook-form';
import StepContainer from './common/StepContainer';
import Input from './common/Input';

const FormStyled = styled.form``;

const FixedAmountTitleStyled = styled.div`
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const ButtonsContainerStyled = styled.div`
  margin-bottom: 3rem;
`;

const AmountColumnStyled = styled.div`
  padding-top: var(--columnGap);
  padding-bottom: var(--columnGap);
`;

const AmountButtonStyled = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.black};
  text-align: center;
  font-size: 0.8rem;
  font-weight: bold;
  border: 1px solid ${({ theme }) => theme.black};
  width: 100%;
  padding: 0.6rem 0.4rem;

  @media (min-width: ${({ theme }) => theme.breakpointTablet}) {
    padding: 1rem 0.75rem;
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

  &:focus {
    outline: 0;
  }
`;

const CustomAmountTitleStyled = styled.div`
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const InputControlStyled = styled.div`
  width: 100%;
  max-width: 200px;
  input {
    font-weight: bold;
  }
`;

const InputEuroStyled = styled.span`
  color: ${({ theme }) => theme.black} !important;
  font-weight: bold;
`;

const AmountStep = ({ data, onNext }) => {
  const fixedAmounts = [5, 10, 15, 25, 50, 100];

  const initialFixedAmount = fixedAmounts.includes(data.amount)
    ? data.amount
    : null;
  const initialCustomAmount = (!initialFixedAmount && data.amount) || null;

  const [fixedAmount, setFixedAmount] = useState(initialFixedAmount);
  const [amount, setAmount] = useState(
    initialFixedAmount || initialCustomAmount
  );

  const { register, handleSubmit, errors, triggerValidation } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      customAmount: initialCustomAmount,
    },
  });

  const getData = () => {
    return {
      amount,
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

  const onClickFixedAmount = value => {
    setFixedAmount(value);
    setAmount(value);
  };

  const onCustomAmountFocus = () => {
    // Reset fixed amount
    if (fixedAmount) {
      setFixedAmount(null);
      setAmount(null);
    }
  };

  const onCustomAmountChange = e => {
    const { value } = e.currentTarget;
    setAmount(value || null);
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
      amount={amount}
    >
      <FormStyled onSubmit={handleSubmit(submitForm)}>
        <FixedAmountTitleStyled>
          Je participe à hauteur de
        </FixedAmountTitleStyled>
        <ButtonsContainerStyled className="columns is-mobile is-multiline is-variable is-1">
          {fixedAmounts.map(anAmount => (
            <AmountColumnStyled className="column is-one-third" key={anAmount}>
              <AmountButtonStyled
                type="button"
                className={`${fixedAmount === anAmount ? 'is-active' : ''}`}
                onClick={() => onClickFixedAmount(anAmount)}
              >
                {anAmount}€
              </AmountButtonStyled>
            </AmountColumnStyled>
          ))}
        </ButtonsContainerStyled>
        <CustomAmountTitleStyled>
          ou je choisis de donner
        </CustomAmountTitleStyled>

        <InputControlStyled className="control has-icons-right">
          <Input
            className={`input ${
              !fixedAmount && errors.customAmount ? 'has-error' : ''
            }`}
            type="number"
            name="customAmount"
            placeholder="--"
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
            onChange={onCustomAmountChange}
            step="1"
            min="1"
            max="9999"
            autoComplete="off"
            spellCheck="false"
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
