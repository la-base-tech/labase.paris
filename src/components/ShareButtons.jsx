import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  EmailShareButton,
  TwitterShareButton,
  FacebookShareButton,
  TelegramShareButton,
  WhatsappShareButton,
} from 'react-share';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faTwitter,
  faTelegram,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';

const ContainerStyled = styled.div`
  text-align: center;
`;

const ButtonWrapperStyled = styled.div`
  display: inline-block;
  &:not(:last-child) {
    margin-right: 0.5rem;
  }
`;

const IconWrapperStyled = styled.div`
  border-radius: 50%;
  text-align: center;
  width: 2.5rem;
  height: 2.5rem;
  line-height: 2.5rem;
  font-size: 1.3rem;
  border: 1px solid ${({ theme }) => theme.black};
  color: ${({ theme }) => theme.black};

  &:hover {
    transition: all 0.2s ease;
    transform: scale(1.1);
    background: ${({ theme }) => theme.black};
    color: ${({ theme }) => theme.white};
  }
`;

const ShareButtons = ({
  url,
  twitterProps,
  whatsappProps,
  telegramProps,
  emailProps,
  ...rest
}) => {
  const buttons = [
    {
      name: 'facebook',
      component: FacebookShareButton,
      icon: faFacebookF,
      props: {
        url,
      },
    },
    {
      name: 'email',
      component: EmailShareButton,
      icon: faEnvelope,
      props: {
        url: '',
        separator: '',
        ...emailProps,
      },
    },
    {
      name: 'twitter',
      component: TwitterShareButton,
      icon: faTwitter,
      props: {
        url,
        ...twitterProps,
      },
    },
    {
      name: 'telegram',
      component: TelegramShareButton,
      icon: faTelegram,
      props: {
        url,
        ...telegramProps,
      },
    },
    {
      name: 'whatsapp',
      component: WhatsappShareButton,
      icon: faWhatsapp,
      props: {
        url,
        ...whatsappProps,
      },
    },
  ];

  return (
    <ContainerStyled {...rest}>
      {buttons.map(button => (
        <ButtonWrapperStyled key={button.name}>
          <button.component {...button.props}>
            <IconWrapperStyled>
              <FontAwesomeIcon icon={button.icon} />
            </IconWrapperStyled>
          </button.component>
        </ButtonWrapperStyled>
      ))}
    </ContainerStyled>
  );
};

ShareButtons.propTypes = {
  url: PropTypes.string.isRequired,
  twitterProps: PropTypes.shape({
    via: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    hashtags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  whatsappProps: PropTypes.shape({
    title: PropTypes.string.isRequired,
    separator: PropTypes.string.isRequired,
  }).isRequired,
  telegramProps: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
  emailProps: PropTypes.shape({
    subject: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
};

export default ShareButtons;
