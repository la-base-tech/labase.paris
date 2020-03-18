/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeContext } from 'styled-components';
import { lighten } from 'polished';
import { useForm } from 'react-hook-form';
import validator from 'email-validator';
import { CardElement } from 'react-stripe-elements';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { useStripe } from '../../../Stripe';
import CrowdfundingStatusContext from '../../../CrowdfundingStatus/Context';
import { Context as PaymentIntentContext } from '../PaymentIntentManager';
import StepContainer from './common/StepContainer';
import Input from './common/Input';

const FormStyled = styled.form``;

const SectionTitleStyled = styled.h4`
  font-weight: 800;
  font-size: 1rem;
  line-height: 1rem;
  margin-bottom: 0.5rem;

  @media (min-width: ${({ theme }) => theme.breakpointTablet}) {
    margin-bottom: 0 !important;
  }
`;

const CardSectionTitleStyled = styled(SectionTitleStyled)`
  margin-top: 0.75rem;
`;

const TextSecurityStyled = styled.p`
  font-size: 0.8rem;
  line-height: 0.8rem;
  margin-bottom: 1rem;
`;

const NameColumnsStyled = styled.div`
  margin-bottom: 0 !important;
  margin-top: 0 !important;

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
  margin-top: 0.25rem;
`;

const CheckboxStyled = styled.input`
  margin-right: 0.5rem;
`;

const LabelStyled = styled.label`
  font-size: 0.8rem;
`;

const CardElementStyled = styled(CardElement)`
  @media (min-width: ${({ theme }) => theme.breakpointTablet}) {
    margin-top: 0.75rem;
  }

  background: ${({ theme }) => lighten(0.3, theme.yellow)};
  padding-bottom: calc(0.5em - 1px);
  padding-left: calc(0.75em - 1px);
  padding-right: calc(0.75em - 1px);
  padding-top: calc(0.5em - 1px);
  border-bottom: 1px solid ${({ theme }) => theme.black};

  &:hover,
  &.StripeElement--focus {
    transition: all 230ms ease;
  }

  &.StripeElement--focus {
    background-color: ${({ theme }) => lighten(0.45, theme.yellow)};
    border-bottom-color: ${({ theme }) => lighten(0.2, theme.black)};
  }

  &:hover {
    background-color: ${({ theme }) => lighten(0.4, theme.yellow)};
    border-bottom-color: ${({ theme }) => lighten(0.1, theme.black)};
  }
`;

const CardErrorStyled = styled.div`
  color: ${({ theme }) => theme.red};
  font-size: 0.8rem;
  text-align: left;
  font-weight: bold;
  line-height: 0.8rem;
  margin-top: 0.25rem;
`;

const FormErrorStyled = styled.div`
  color: ${({ theme }) => theme.red};
  font-weight: bold;
`;

const LockIconStyled = styled(FontAwesomeIcon)`
  opacity: 0.5;
`;

const stripeErrors = {
  unknown:
    'Une erreur inconnue est survenue (code : {{ errorCode }}), veuillez réessayer plus tard. Vous ne serez pas débité.',
  card: 'Veuillez vérifier les informations de votre carte',
};

function templateReplace(str, params) {
  return Object.keys(params).reduce((accumulator, key) => {
    return accumulator.replace(`{{ ${key} }}`, params[key]);
  }, str || '');
}

const InformationsStep = ({ data, onPrevious, onNext }) => {
  const { stripe, elements } = useStripe();
  const [isLoading, setIsLoading] = useState(false);
  const [cardError, setCardError] = useState(null);
  const [formError, setFormError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const { updatePaymentIntent, resetPaymentIntent } = useContext(
    PaymentIntentContext
  );
  const theme = useContext(ThemeContext);
  const crowdfundingStatus = useContext(CrowdfundingStatusContext);

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

  useEffect(() => {
    // Send to FB
    if (typeof fbq === 'function') {
      window.fbq('track', 'InitiateCheckout', {
        currency: 'EUR',
        value: Number.parseFloat(data.amount).toFixed(2),
      });
    }
  });

  // Implement auto focus on the first input
  const firstnameInputRef = useRef();
  useEffect(() => {
    // Do not focus if not empty
    if (data.firstname) {
      return;
    }
    // Only on mobile
    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
      firstnameInputRef.current.focus({
        preventScroll: true, // Let the step manager handle the scroll
      });
    }
  }, []);

  const getFormUnknownError = code => {
    return templateReplace(stripeErrors.unknown, { errorCode: code });
  };

  const setFormErrorWithCode = code => {
    const message = getFormUnknownError(code);
    setFormError(message);
  };

  const getFormValues = () => getValues();

  const requestPayment = async () => {
    if (isLoading) {
      return;
    }

    const isValid = await triggerValidation();

    if (!cardComplete) {
      // eslint-disable-next-line no-console
      console.log('Card incomplete');
      setCardError(stripeErrors.card);
      return;
    }

    if (!isValid) {
      return;
    }

    setCardError(null);
    setFormError(null);
    setIsLoading(true);

    const newData = getFormValues();
    const updatedData = { ...data, ...newData };

    try {
      // Get the payment intent on the server
      const paymentIntent = await updatePaymentIntent(updatedData);

      const cardElement = elements.getElement('card');

      // Should not append
      if (!cardElement) {
        setFormErrorWithCode('card_element_not_found');
        return;
      }

      // Confirm the payment intent
      const result = await stripe.confirmCardPayment(
        paymentIntent.clientSecret,
        {
          payment_method: {
            card: cardElement,
          },
        }
      );

      // An error occured during the Stripe payment confirmation
      if (result.error) {
        // eslint-disable-next-line no-console
        console.log(result);

        const errorType = result.error.type;

        // An error occured with the card
        if (errorType === 'card_error') {
          setCardError(result.error.message);
        } else if (result.error.message) {
          setFormError(result.error.message);
        } else {
          setFormErrorWithCode(errorType);
        }

        setIsLoading(false);
        return;
      }

      // Reset payment intent to allow other donations
      resetPaymentIntent();

      // Update stats
      crowdfundingStatus.addAmount(data.amount);
      crowdfundingStatus.addContributor();

      onNext();

      // Send to FB
      if (typeof fbq === 'function') {
        window.fbq('track', 'Purchase', {
          currency: 'EUR',
          value: Number.parseFloat(data.amount).toFixed(2),
          content_name: 'Don',
        });
      }

      // Send to gtag
      if (typeof gtag === 'function') {
        window.gtag('event', 'purchase', {
          transaction_id: paymentIntent.id,
          value: Number.parseFloat(data.amount).toFixed(2),
          currency: 'EUR',
          items: [
            {
              id: '1',
              name: 'Don',
              quantity: 1,
              price: Number.parseFloat(data.amount).toFixed(2),
            },
          ],
        });
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      setIsLoading(false);
      setFormErrorWithCode('unknown');
    }
  };

  const onStripeCardReady = () => {};

  const onStripeCardChange = event => {
    setCardComplete(event.complete);

    if (event.error) {
      setCardError(event.error.message);
    } else {
      setCardError(null);
    }
  };

  const onClickPreviousButton = () => {
    onPrevious(getFormValues());
  };

  return (
    <StepContainer
      title="Mon paiement"
      buttonPrevious={{
        title: '> Précédent',
        onClick: onClickPreviousButton,
      }}
      buttonNext={{
        title: 'Donner',
        onClick: requestPayment,
        isSubmit: true,
        isLoading,
      }}
      amount={data.amount}
    >
      <FormStyled onSubmit={handleSubmit(requestPayment)}>
        <TextSecurityStyled className="is-hidden-mobile">
          Le paiement et vos données sont sécurisés par Stripe{' '}
          <LockIconStyled icon={faLock} />
        </TextSecurityStyled>
        <SectionTitleStyled>Mes informations</SectionTitleStyled>

        <NameColumnsStyled className="columns">
          <NameColumnStyled className="column">
            <InputControlStyled className="control">
              <Input
                className={`input ${errors.firstname ? 'has-error' : ''}`}
                type="text"
                name="firstname"
                placeholder="Mon prénom"
                ref={e => {
                  register(e, {
                    required: true,
                    minLength: 2,
                    maxLength: 50,
                  });
                  firstnameInputRef.current = e;
                }}
                onEnterKeyDown={requestPayment}
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
                onEnterKeyDown={requestPayment}
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
            onEnterKeyDown={requestPayment}
          />
        </div>
        <CheckboxControlStyled className="control">
          <LabelStyled className="checkbox">
            <CheckboxStyled type="checkbox" name="subscribe" ref={register()} />
            Je m'inscris à la newsletter de la base
          </LabelStyled>
        </CheckboxControlStyled>
        <CardSectionTitleStyled>Ma carte bancaire</CardSectionTitleStyled>

        <CardElementStyled
          style={{
            base: {
              iconColor: theme.black,
              fontFamily: '"Montserrat", sans-serif',
              fontSize: '16px',
              fontSmoothing: 'antialiased',
              '::placeholder': {
                color: '#7e7100',
                fontWeight: '300',
              },
            },
            invalid: {
              color: theme.red,
              iconColor: theme.red,
            },
          }}
          onChange={onStripeCardChange}
          onReady={onStripeCardReady}
          hidePostalCode
        />
        <CardErrorStyled>{cardError}</CardErrorStyled>
        {formError && <FormErrorStyled>{formError}</FormErrorStyled>}
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
