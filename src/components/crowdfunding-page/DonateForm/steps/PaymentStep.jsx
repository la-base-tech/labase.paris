import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeContext } from 'styled-components';
import { CardElement } from 'react-stripe-elements';
import { useStripe } from '../../../Stripe';
import StepContainer from './common/StepContainer';
import { Context as PaymentIntentContext } from '../PaymentIntentManager';

const TextStyled = styled.p`
  font-size: 0.8rem;
  margin: 1rem 0;
`;

const CardElementStyled = styled(CardElement)`
  margin-top: 2rem;
`;

const CardErrorStyled = styled.div`
  color: ${({ theme }) => theme.red};
  font-size: 0.8rem;
  text-align: left;
  padding-left: 30px;
`;

const FormErrorStyled = styled.div`
  color: ${({ theme }) => theme.red};
  font-weight: bold;
`;

const AmountStyled = styled.div`
  margin-top: 2rem;
  font-weight: bold;
  font-size: 1.2rem;
`;

const errors = {
  unknown:
    'Une erreur inconnue est survenue (code : {{ errorCode }}), veuillez réessayer plus tard. Vous ne serez pas débité.',
  card: 'Veuillez vérifier les informations de votre carte',
};

function templateReplace(str, params) {
  return Object.keys(params).reduce((accumulator, key) => {
    return accumulator.replace(`{{ ${key} }}`, params[key]);
  }, str || '');
}

const PaymentStep = ({ data, onPrevious, onNext }) => {
  const { stripe, elements } = useStripe();
  const [isLoading, setIsLoading] = useState(true);
  const [cardError, setCardError] = useState(null);
  const [formError, setFormError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const { getPaymentIntent, resetPaymentIntent } = useContext(
    PaymentIntentContext
  );
  const theme = useContext(ThemeContext);

  const getFormUnknownError = code => {
    return templateReplace(errors.unknown, { errorCode: code });
  };

  const setFormErrorWithCode = code => {
    const message = getFormUnknownError(code);
    setFormError(message);
  };

  const requestPayment = async () => {
    if (isLoading) {
      return;
    }
    if (!cardComplete) {
      setCardError(errors.card);
      return;
    }

    setCardError(null);
    setFormError(null);
    setIsLoading(true);

    try {
      // Create the payment intent on the server
      const paymentIntent = await getPaymentIntent();

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

      // Success
      resetPaymentIntent();
      onNext();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      setIsLoading(false);
      setFormErrorWithCode('unknown');
    }
  };

  const onStripeCardReady = () => {
    const cardElement = elements.getElement('card');
    cardElement.focus();
  };

  const onStripeCardChange = event => {
    setCardComplete(event.complete);

    if (event.error) {
      setCardError(event.error.message);
    } else {
      setCardError(null);
    }
  };

  return (
    <StepContainer
      title="Mon don"
      buttonPrevious={{
        title: 'Précédent',
        onClick: () => onPrevious(),
      }}
      buttonNext={{
        title: 'Donner',
        onClick: requestPayment,
        isSubmit: true,
        isLoading,
      }}
    >
      <TextStyled>
        Le paiement et vos informations sont sécurisés par Stripe
      </TextStyled>
      <form>
        <CardElementStyled
          style={{
            base: {
              iconColor: theme.black,
              fontFamily: '"Open Sans", sans-serif',
              '::placeholder': {
                color: '#CCB700',
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

        <AmountStyled>Mon don : {data.amount}€</AmountStyled>
      </form>
    </StepContainer>
  );
};

PaymentStep.propTypes = {
  onPrevious: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  data: PropTypes.shape({
    amount: PropTypes.number.isRequired,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    subscribe: PropTypes.bool.isRequired,
  }).isRequired,
};

export default PaymentStep;
