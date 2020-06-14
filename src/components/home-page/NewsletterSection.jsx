import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeContext } from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';
import GatsbyImage from 'gatsby-image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import isEmail from 'validator/lib/isEmail';
import { post as apiPost, API_URL } from '../../api';
import AnimatedCheck from '../AnimatedCheck';
import Markdown from '../Markdown';

const API_ENDPOINT = 'actions/subscribe';
const FORM_ENDPOINT = API_URL + API_ENDPOINT;

const SectionStyled = styled.section`
  margin-top: -40px;
  @media (min-width: ${props => props.theme.breakpointTablet}) {
    margin: auto;
    margin-top: -40px;
    position: relative;
  }
`;

const ContainerStyled = styled.div`
  background-color: ${props => props.theme.yellow};
  @media (min-width: ${props => props.theme.breakpointTablet}) {
    width: 80%;
    max-width: ${960 * 0.8}px;
    background-image: url(${props => props.image});
    background-position: calc(100% - 64px) 0;
    background-repeat: no-repeat;
  }
`;

const ColumnStyled = styled.div`
  padding: 32px;
  padding-bottom: 0;

  @media (min-width: ${props => props.theme.breakpointTablet}) {
    padding: 64px;
    padding-right: 16px;
  }
`;

const TitleStyled = styled.h3`
  margin-bottom: 16px;
`;

const TextStyled = styled(Markdown)`
  font-weight: 300;
  font-size: 16px;
`;

const ImageStyled = styled(GatsbyImage)`
  max-width: 50%;
  margin: auto;

  @media (min-width: ${props => props.theme.breakpointTablet}) {
    max-width: 100%;
  }
`;

const FormStyled = styled.form`
  padding: 32px;

  @media (min-width: ${props => props.theme.breakpointTablet}) {
    padding: 64px;
    padding-top: 0;
  }
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

const NewsletterSection = ({ image, title, text, newsletter }) => {
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

    try {
      await apiPost(API_ENDPOINT, {
        email,
      });
      setFormSent(true);
    } catch (error) {
      setFormHasError(true);
    }

    setFormLoading(false);
  };

  return (
    <SectionStyled id="newsletter">
      <ContainerStyled className="container">
        <div className="columns is-marginless is-vcentered">
          <ColumnStyled className="column">
            <TitleStyled>{title}</TitleStyled>
            <TextStyled>{text}</TextStyled>
          </ColumnStyled>
          <div className="column is-two-fifths">
            <ImageStyled fluid={image.childImageSharp.fluid} />
          </div>
        </div>
        <FormStyled onSubmit={handleSubmit} action={FORM_ENDPOINT}>
          <TitleStyled>{newsletter.title}</TitleStyled>
          <div className="columns">
            <div className="column">
              <InputControlStyled className="control has-icons-right">
                <InputStyled
                  name="email"
                  onChange={handleEmailChange}
                  value={email}
                  className="input"
                  type="email"
                  placeholder={newsletter.input.placeholder}
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
                <p className="help is-danger">{newsletter.errorMessage}</p>
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
                  {newsletter.button.title}
                </ButtonStyled>
              )}
            </div>
          </div>
        </FormStyled>
      </ContainerStyled>
    </SectionStyled>
  );
};

NewsletterSection.propTypes = {
  image: PropTypes.shape({
    childImageSharp: PropTypes.shape({
      fluid: PropTypes.shape({}).isRequired,
    }).isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  newsletter: PropTypes.shape({
    title: PropTypes.string.isRequired,
    errorMessage: PropTypes.string.isRequired,
    input: PropTypes.shape({
      placeholder: PropTypes.string.isRequired,
    }).isRequired,
    button: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default function NewsletterSectionWrapper() {
  return (
    <StaticQuery
      query={graphql`
        query {
          content: yaml(fields: { name: { eq: "page-home" } }) {
            section: newsletterSection {
              image {
                childImageSharp {
                  fluid(maxWidth: 700) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
              title
              text
              newsletter {
                title
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
      render={data => <NewsletterSection {...data.content.section} />}
    />
  );
}
