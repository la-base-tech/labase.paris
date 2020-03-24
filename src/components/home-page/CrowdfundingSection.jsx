import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import GatsbyImage from 'gatsby-image';
import styled, { ThemeContext } from 'styled-components';
import { useInView } from 'react-intersection-observer';
import Link from '../Link';
import { Context as NavbarContext } from '../Navbar';
import CrowdfundingStatus from '../CrowdfundingStatus';

const ContainerStyled = styled.section`
  background: ${props => props.theme.yellow};
`;

const TitleStyled = styled.h2`
  color: ${props => props.theme.black};
  font-weight: 900;
  font-size: 2.5rem;
  line-height: 3rem;

  @media (min-width: ${({ theme }) => theme.breakpointTablet}) {
    margin: 1rem 0;
    font-size: 2.7rem;
    line-height: 3.2rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpointDesktop}) {
    font-size: 3rem;
    line-height: 3.5rem;
  }
`;

const TextStyled = styled.p``;

const ButtonStyled = styled(Link)`
  padding: 1rem 2rem !important;
  margin-top: 1rem;
  font-weight: bold;
`;

const CrowdfundingStatusMobileStyled = styled(CrowdfundingStatus)`
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const Section = ({ title, text, button, image }) => {
  const theme = useContext(ThemeContext);
  const { showButton, hideButton } = useContext(NavbarContext);
  const [ref, inView, entry] = useInView({
    threshold: 0.2,
  });

  if (inView) {
    hideButton();
  } else if (entry) {
    showButton();
  }

  return (
    <ContainerStyled className="section" ref={ref}>
      <div className="container">
        <div className="columns is-vcentered">
          <div className="column">
            <TextStyled className="is-hidden-mobile">{text}</TextStyled>
            <TitleStyled>{title}</TitleStyled>
            <CrowdfundingStatusMobileStyled
              className="is-hidden-tablet"
              backgroundColor={theme.yellow}
              textColor={theme.black}
            />
            <ButtonStyled
              href="/don/"
              className="button is-primary is-inverted"
            >
              {button.title}
            </ButtonStyled>
          </div>
          <div className="column is-hidden-mobile">
            <GatsbyImage fluid={image.childImageSharp.fluid} loading="eager" />
            <CrowdfundingStatus
              backgroundColor={theme.yellow}
              textColor={theme.black}
            />
          </div>
        </div>
      </div>
    </ContainerStyled>
  );
};

Section.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  image: PropTypes.shape({
    childImageSharp: PropTypes.shape({
      fluid: PropTypes.shape({}).isRequired,
    }).isRequired,
  }).isRequired,
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
              image {
                childImageSharp {
                  fluid(maxWidth: 480) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
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
