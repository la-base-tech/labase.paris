/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import validator from 'email-validator';
import StepContainer from './common/StepContainer';
import Input from './common/Input';

const FormStyled = styled.form``;

const TextStyled = styled.p`
  font-size: 0.8rem;
  margin-bottom: 1rem;
`;

const NameColumnsStyled = styled.div`
  margin-bottom: 0 !important;
  @media (max-width: ${({ theme }) => theme.breakpointTabletBefore}) {
    margin: 0 !important;
  }
`;

const NameColumnStyled = styled.div`
  @media (max-width: ${({ theme }) => theme.breakpointTabletBefore}) {
    padding: 0 !important;
  }
`;

const InputControlStyled = styled.div`
  margin-bottom: 0.25rem;
  @media (min-width: ${({ theme }) => theme.breakpointTablet}) {
    margin-bottom: 0;
  }
`;

const CheckboxControlStyled = styled.div`
  margin-top: 1rem;
`;

const CheckboxStyled = styled.input`
  margin-right: 0.5rem;
`;

const LabelStyled = styled.label`
  font-size: 0.9rem;
`;

const InformationsStep = ({ data, onPrevious, onNext }) => {
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
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      subscribe: data.subscribe,
    },
  });

  const getFormValues = () => getValues();

  const onClickPreviousButton = () => {
    onPrevious(getFormValues());
  };

  const submitForm = async () => {
    const isValid = await triggerValidation();
    if (!isValid) {
      return;
    }
    onNext(getFormValues());
  };

  return (
    <StepContainer
      title="Mes informations"
      buttonPrevious={{
        title: 'Précédent',
        onClick: onClickPreviousButton,
      }}
      buttonNext={{
        title: 'Suivant',
        onClick: submitForm,
      }}
      amount={data.amount}
    >
      <TextStyled>
        Les informations serviront à éditer la facture et procéder au paiement.
      </TextStyled>
      <FormStyled onSubmit={handleSubmit(submitForm)}>
        <NameColumnsStyled className="columns">
          <NameColumnStyled className="column">
            <InputControlStyled className="control">
              <Input
                className={`input ${errors.firstname ? 'has-error' : ''}`}
                type="text"
                name="firstname"
                placeholder="Mon prénom"
                ref={register({
                  required: true,
                  minLength: 2,
                  maxLength: 50,
                })}
                onEnterKeyDown={submitForm}
              />
            </InputControlStyled>
          </NameColumnStyled>
          <NameColumnStyled className="column">
            <InputControlStyled className="control">
              <Input
                className={`input ${errors.lastname ? 'has-error' : ''}`}
                type="text"
                name="lastname"
                placeholder="Mon nom"
                ref={register({
                  required: true,
                  minLength: 2,
                  maxLength: 50,
                })}
                onEnterKeyDown={submitForm}
              />
            </InputControlStyled>
          </NameColumnStyled>
        </NameColumnsStyled>
        <div className="control">
          <Input
            className={`input ${errors.email ? 'has-error' : ''}`}
            type="text"
            name="email"
            placeholder="Mon email"
            ref={register({
              required: true,
              maxLength: 150,
              validate: value => validator.validate(value),
            })}
            onEnterKeyDown={submitForm}
          />
        </div>
        <CheckboxControlStyled className="control">
          <LabelStyled className="checkbox">
            <CheckboxStyled type="checkbox" name="subscribe" ref={register()} />
            Je souhaite m'inscrire à la newsletter de la base
          </LabelStyled>
        </CheckboxControlStyled>
      </FormStyled>
    </StepContainer>
  );
};

InformationsStep.propTypes = {
  onPrevious: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  data: PropTypes.shape({
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    subscribe: PropTypes.bool.isRequired,
    amount: PropTypes.number.isRequired,
  }).isRequired,
};

export default InformationsStep;
