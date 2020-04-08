import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeContext } from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';
import AnimatedCheck from '../../../AnimatedCheck';
import StepContainer from './common/StepContainer';
import StepTitle from './common/StepTitle';
import ShareButtons from '../../../ShareButtons';

const AnimatedCheckContainerStyled = styled.div`
  display: inline-block;
  top: 5px;
  position: relative;
  margin-right: 0.5rem;
`;

const TextStyled = styled.p``;

const AmountStyled = styled.span`
  display: block;
  font-weight: bold;
  font-size: 1.2rem;
`;

const ShareTitleStyled = styled(StepTitle)`
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const ShareButtonsStyled = styled(ShareButtons)`
  margin-top: 0.5rem;
`;

const SuccessStep = ({ data, share }) => {
  const theme = useContext(ThemeContext);

  const url = 'https://labase.paris/don/';

  return (
    <StepContainer title="Paiement validé">
      <AnimatedCheckContainerStyled>
        <AnimatedCheck checkColor={theme.yellow} circleColor={theme.black} />
      </AnimatedCheckContainerStyled>
      Toute l’équipe de la base te remercie pour{' '}
      <AmountStyled>ton don de {data.amount}€ !</AmountStyled>
      <ShareTitleStyled>Passe le mot !</ShareTitleStyled>
      <TextStyled>Partage ce financement citoyen à ton entourage</TextStyled>
      <ShareButtonsStyled url={url} {...share} />
      <img
        height="1"
        width="1"
        style={{ display: 'none' }}
        alt=""
        src="https://px.ads.linkedin.com/collect/?pid=1836012&conversionId=1836553&fmt=gif"
      />
    </StepContainer>
  );
};

SuccessStep.propTypes = {
  share: PropTypes.shape({}).isRequired,
  data: PropTypes.shape({
    amount: PropTypes.number.isRequired,
  }).isRequired,
};

export default function SuccessStepWrapper(props) {
  return (
    <StaticQuery
      query={graphql`
        query {
          page: yaml(fields: { name: { eq: "page-donate" } }) {
            share {
              twitterProps {
                via
                title
                hashtags
              }
              whatsappProps {
                title
                separator
              }
              emailProps {
                subject
                body
              }
              telegramProps {
                title
              }
            }
          }
        }
      `}
      render={data => <SuccessStep share={data.page.share} {...props} />}
    />
  );
}
