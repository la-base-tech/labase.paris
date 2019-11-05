import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeContext } from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import isEmail from 'validator/lib/isEmail';

import AnimatedCheck from '../AnimatedCheck';

const FUNCTION_ENDPOINT = '/.netlify/functions/subscribe-newsletter';

const SectionStyled = styled.section`
  background-color: ${props => props.theme.yellow};

  @media (min-width: ${props => props.theme.breakpointTablet}) {
    background-image: url(/images/home-section-newsletter.svg);
    background-position: calc(100% - 64px) 0;
    background-repeat: no-repeat;
    width: 80%;
    margin: auto;
  }
`;

const ContainerStyled = styled.div`
  padding: 32px;

  @media (min-width: ${props => props.theme.breakpointTablet}) {
    padding: 64px;
  }
`;

const TitleStyled = styled.h3`
  text-transform: uppercase;
`;

const TextStyled = styled.div`
  margin-top: 32px;
  font-weight: 300;
  font-size: 16px;
`;

const HintStyled = styled.div`
  margin-top: 16px;
  font-size: 8px;
  letter-spacing: 0.24em;
  text-transform: uppercase;
`;

const FormStyled = styled.form`
  margin-top: 32px;
`;

const InputControlStyled = styled.div`
  .icon.is-right.is-valid {
    color: ${props => props.theme.black} !important;
  }
`;

const InputStyled = styled.input`
  background: transparent;
  color: ${props => props.theme.black};
  border-radius: 0;

  &,
  &:hover,
  &:focus {
    border: transparent;
    box-shadow: none;
    border-bottom: 1px solid ${props => props.theme.black};
  }
`;

const ButtonStyled = styled.button`
  width: 100%;
  color: ${props => props.theme.yellow} !important;
  font-weight: 800;
  font-size: 24px;

  @media (min-width: ${props => props.theme.breakpointTablet}) {
    width: auto;
    font-size: 16px;
  }
`;

const AnimatedCheckContainerStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NewsletterSection = ({
  title,
  text,
  hint,
  errorMessage,
  input,
  button,
}) => {
  const theme = useContext(ThemeContext);
  const [email, setEmail] = useState('');
  const [emailIsValid, setEmailValid] = useState(false);
  const [formIsLoading, setFormLoading] = useState(false);
  const [formIsSent, setFormSent] = useState(false);
  const [formHasError, setFormHasError] = useState(false);

  const handleEmailChange = e => {
    const { value } = e.target;
    setEmail(value);
    setEmailValid(isEmail(value));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (formIsLoading) {
      return;
    }

    setFormLoading(true);

    const formDomEl = e.target;
    const action = formDomEl.getAttribute('action');

    try {
      await fetch(action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: JSON.stringify({
          email,
        }),
      });
      setFormSent(true);
    } catch (error) {
      setFormHasError(true);
    }

    setFormLoading(false);
  };

  return (
    <div className="container">
      <SectionStyled>
        <div className="columns">
          <ContainerStyled className="column is-two-thirds">
            <TitleStyled>{title}</TitleStyled>
            <TextStyled>{text}</TextStyled>

            <HintStyled>{hint}</HintStyled>

            <FormStyled onSubmit={handleSubmit} action={FUNCTION_ENDPOINT}>
              <div className="columns">
                <div className="column">
                  <InputControlStyled className="control has-icons-right">
                    <InputStyled
                      name="email"
                      onChange={handleEmailChange}
                      value={email}
                      className="input"
                      type="email"
                      placeholder={input.placeholder}
                      required
                    />
                    {emailIsValid &&
                      !(formIsSent || formIsLoading || formHasError) && (
                        <span className="icon is-small is-right is-valid">
                          <FontAwesomeIcon icon={faCheck} />
                        </span>
                      )}
                  </InputControlStyled>
                  {formHasError && (
                    <p className="help is-danger">{errorMessage}</p>
                  )}
                </div>
                <div className="column is-narrow">
                  {formIsSent && (
                    <AnimatedCheckContainerStyled>
                      <AnimatedCheck
                        checkColor={theme.yellow}
                        circleColor={theme.black}
                      />
                    </AnimatedCheckContainerStyled>
                  )}
                  {!formIsSent && (
                    <ButtonStyled
                      className={`button is-black ${
                        formIsLoading ? 'is-loading' : ''
                      }`}
                      type="submit"
                      disabled={!emailIsValid || formHasError}
                    >
                      {button.title}
                    </ButtonStyled>
                  )}
                </div>
              </div>
            </FormStyled>
          </ContainerStyled>
          <div className="column" />
        </div>
      </SectionStyled>
    </div>
  );
};

NewsletterSection.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  hint: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  input: PropTypes.shape({
    placeholder: PropTypes.string.isRequired,
  }).isRequired,
  button: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default function NewsletterSectionWrapper(props) {
  return (
    <StaticQuery
      query={graphql`
        query {
          content: markdownRemark(fields: { name: { eq: "page-index" } }) {
            frontmatter {
              newsletterSection {
                title
                text
                hint
                input {
                  placeholder
                }
                button {
                  title
                }
                errorMessage
              }
            }
          }
        }
      `}
      render={data => (
        <NewsletterSection
          {...data.content.frontmatter.newsletterSection}
          {...props}
        />
      )}
    />
  );
}
