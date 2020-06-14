import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import styled, { ThemeContext } from 'styled-components';
import { useInView } from 'react-intersection-observer';
import Link from '../Link';
import { Context as NavbarContext } from '../Navbar';
import CrowdfundingStatus from '../CrowdfundingStatus';

const ContainerStyled = styled.section`
  background: ${props => props.theme.yellow};
  padding: ;
`;

const TitleStyled = styled.h2`
  color: ${props => props.theme.black};
  font-weight: 900;
  font-size: 1.3rem;
  line-height: 1.6rem;
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpointTablet}) {
    font-size: 1.5rem;
    line-height: 1.7rem;
    text-align: left;
  }

  @media (min-width: ${({ theme }) => theme.breakpointDesktop}) {
    font-size: 2rem;
    line-height: 2.5rem;
  }
`;

const TextStyled = styled.p`
  margin-top: 1rem;
`;

const ButtonStyled = styled(Link)`
  padding: 1rem 2rem !important;
  font-weight: bold;
`;

const CrowdfundingStatusMobileStyled = styled(CrowdfundingStatus)`
  margin-top: 1rem;
`;

const Section = ({ title, text, button }) => {
  const theme = useContext(ThemeContext);
  const { showButton, hideButton } = useContext(NavbarContext);
  const [ref, inView, entry] = useInView({
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      hideButton();
    } else if (entry) {
      showButton();
    }
  }, [inView]);

  return (
    <ContainerStyled className="section" ref={ref}>
      <div className="container">
        <div className="columns is-vcentered">
          <div className="column">
            <TitleStyled>{title}</TitleStyled>
            <TextStyled className="is-hidden-mobile">{text}</TextStyled>
          </div>
          <div className="column is-narrow has-text-centered">
            <ButtonStyled
              href="/don/"
              className="button is-primary is-inverted"
            >
              {button.title}
            </ButtonStyled>
          </div>
        </div>
        <CrowdfundingStatusMobileStyled
          backgroundColor={theme.yellow}
          textColor={theme.black}
        />
      </div>
    </ContainerStyled>
  );
};

Section.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  button: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default function SectionWrapper() {
  return (
    <StaticQuery
      query={graphql`
        query {
          content: yaml(fields: { name: { eq: "page-home" } }) {
            section: crowdfundingSection {
              title
              text
              button {
                title
              }
            }
          }
        }
      `}
      render={data => <Section {...data.content.section} />}
    />
  );
}
