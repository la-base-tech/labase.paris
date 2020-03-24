import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import StepContainer from '../common/StepContainer';
import Input from '../common/Input';
import TaxExemptionSummary from './TaxExemptionSummary';
import Suggestions from './Suggestions';

const FormStyled = styled.form`
  max-width: 350px;
  margin: auto;
`;

const TitleStyled = styled.div`
  font-weight: 900;
  margin-bottom: 1rem;
  text-align: center;
  font-size: 1.5rem;

  @media (min-width: ${({ theme }) => theme.breakpointTablet}) {
    font-size: 1.7rem;
  }
`;

const InputControlStyled = styled.div`
  width: 250px;
  margin: auto;
  margin-bottom: 1rem;
`;

const InputStyled = styled(Input)`
  text-align: right;
  font-weight: bold;
  font-size: 1.2rem;
  padding-right: 5.5em !important;

  @media (min-width: ${({ theme }) => theme.breakpointTablet}) {
    font-size: 1.5rem;
    padding-right: 4.5em !important;
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
  right: 3.5em !important;

  @media (min-width: ${({ theme }) => theme.breakpointTablet}) {
    right: 2.5em !important;
    font-size: 1.5rem;
  }
`;

const SuggestionsTitleStyled = styled.div`
  font-weight: bold;
  text-align: center;
  margin-bottom: 0.5rem;
`;

const SuggestionsStyled = styled(Suggestions)`
  width: 250px;
  margin: auto;
  margin-bottom: 1rem;
`;

const ButtonContainerStyled = styled.div`
  text-align: center;
  margin-top: 1rem;
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

const INITIAL_AMOUNT = 20;

const AmountStep = ({ data, onNext }) => {
  const [activeSuggestion, setActiveSuggestion] = useState();
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

  const onClickNext = () => {
    callOnNext();
  };

  const onAmountChange = e => {
    const { value } = e.currentTarget;
    setAmount(Number.parseInt(value, 10) || null);
    setActiveSuggestion(null);
  };

  const submitForm = async () => {
    callOnNext();
  };

  const onClickSuggestion = suggestionValue => {
    setActiveSuggestion(suggestionValue);
    setAmount(suggestionValue);
    setValue('amount', suggestionValue);
    triggerValidation();
  };

  return (
    <StepContainer amount={amount}>
      <FormStyled onSubmit={handleSubmit(submitForm)}>
        <TitleStyled>Je fais un don de</TitleStyled>

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

        <SuggestionsTitleStyled>Suggestions</SuggestionsTitleStyled>

        <SuggestionsStyled
          activeValue={activeSuggestion}
          onClickValue={onClickSuggestion}
        />

        <TaxExemptionSummary amount={amount} />

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
