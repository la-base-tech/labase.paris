import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { lighten } from 'polished';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import StepContainer from './common/StepContainer';
import Input from './common/Input';
import TaxExemptionSummary from './common/TaxExemptionSummary';

const FormStyled = styled.form``;

const TitleStyled = styled.div`
  font-weight: 900;
  margin-bottom: 1rem;
  text-align: center;
  font-size: 1.5rem;

  @media (min-width: ${({ theme }) => theme.breakpointTablet}) {
    font-size: 2rem;
  }
`;

const ButtonStyled = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.black};
  text-align: center;
  font-size: 0.8rem;
  font-weight: bold;
  border: 1px solid ${({ theme }) => theme.black};
  height: 48px;
  width: 48px;

  @media (min-width: ${({ theme }) => theme.breakpointTablet}) {
    height: 60px;
    width: 60px;
  }
  padding: 0.6rem 0.4rem;

  &:focus {
    outline: 0;
  }

  &:hover {
    cursor: pointer;
    transition: all 0.2s ease;
    background: ${({ theme }) => lighten(0.2, theme.yellow)};
  }
`;

const ReduceButtonStyled = styled(ButtonStyled)``;

const IncreaseButtonStyled = styled(ButtonStyled)``;

const InputControlStyled = styled.div`
  width: 100px;

  @media (min-width: ${({ theme }) => theme.breakpointTablet}) {
    width: 140px;
  }
`;

const InputStyled = styled(Input)`
  text-align: right;
  font-weight: bold;
  font-size: 1.2rem;
  @media (min-width: ${({ theme }) => theme.breakpointTablet}) {
    font-size: 1.5rem;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;
`;

const InputEuroStyled = styled.span`
  color: ${({ theme }) => theme.black} !important;
  font-weight: bold;
  font-size: 1.2rem;
  @media (min-width: ${({ theme }) => theme.breakpointTablet}) {
    font-size: 1.5rem;
  }
`;

const TaxExemptionSummaryStyled = styled(TaxExemptionSummary)`
  text-align: center;
  margin: auto;
  width: 160px;
  font-size: 0.9rem;

  @media (min-width: ${({ theme }) => theme.breakpointTablet}) {
    width: 180px;
    font-size: 1rem;
  }

  span {
    font-weight: bold;
  }
`;

const ButtonContainerStyled = styled.div`
  text-align: center;
  margin-top: 2rem;
`;

const ButtonContinueStyled = styled.button`
  font-weight: bold;
  font-size: 1.1rem;
  padding-left: 1em;
  padding-right: 1em;

  @media (min-width: ${({ theme }) => theme.breakpointTablet}) {
    padding-left: 2em;
    padding-right: 2em;
  }
`;

const INITIAL_AMOUNT = 30;
const STEP = 10;

const AmountStep = ({ data, onNext }) => {
  const initialAmount = data.amount || INITIAL_AMOUNT;
  const [amount, setAmount] = useState(initialAmount);

  const {
    register,
    handleSubmit,
    errors,
    triggerValidation,
    setValue,
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      amount: initialAmount,
    },
  });

  const getData = () => {
    return {
      amount,
    };
  };

  const callOnNext = async () => {
    const isValid = await triggerValidation();
    if (!isValid) {
      return;
    }

    const newData = getData();
    onNext(newData);

    // Send to FB
    if (typeof fbq === 'function') {
      window.fbq('track', 'AddToCart', {
        currency: 'EUR',
        value: Number.parseFloat(newData.amount).toFixed(2),
        content_name: 'Don',
      });
    }
  };

  const onReduceButtonClick = () => {
    const newAmount = Math.max((amount || 0) - STEP, 0);
    setAmount(newAmount);
    setValue('amount', newAmount);
  };

  const onIncreaseButtonClick = () => {
    const newAmount = Math.min((amount || 0) + STEP, 9999);
    setAmount(newAmount);
    setValue('amount', newAmount);
  };

  const onClickNext = () => {
    callOnNext();
  };

  const onAmountChange = e => {
    const { value } = e.currentTarget;
    setAmount(Number.parseInt(value, 10) || null);
  };

  const submitForm = async () => {
    callOnNext();
  };

  return (
    <StepContainer amount={amount}>
      <FormStyled onSubmit={handleSubmit(submitForm)}>
        <TitleStyled>Je fais un don de</TitleStyled>
        <div className="columns is-mobile is-marginless is-centered">
          <div className="column is-narrow">
            <ReduceButtonStyled type="button" onClick={onReduceButtonClick}>
              <FontAwesomeIcon icon={faMinus} />
            </ReduceButtonStyled>
          </div>
          <div className="column is-narrow">
            <InputControlStyled className="control has-icons-right">
              <InputStyled
                className={`input ${errors.amount ? 'has-error' : ''}`}
                type="number"
                name="amount"
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
                onChange={onAmountChange}
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
          </div>
          <div className="column is-narrow">
            <IncreaseButtonStyled type="button" onClick={onIncreaseButtonClick}>
              <FontAwesomeIcon icon={faPlus} />
            </IncreaseButtonStyled>
          </div>
        </div>
        <TaxExemptionSummaryStyled amount={amount} />

        <ButtonContainerStyled>
          <ButtonContinueStyled
            className="button is-primary is-inverted"
            onClick={onClickNext}
          >
            Continuer
          </ButtonContinueStyled>
        </ButtonContainerStyled>
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
