import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';
import BackgroundImage from '../BackgroundImage';
import { Context as NavbarContext } from '../Navbar';
import { Provider as StatusProvider } from './Status';
import Markdown from '../Markdown';
import DonateForm from './DonateForm';

const ContainerStyled = styled.div`
  position: relative;
`;

const DonateFormWrapperStyled = styled.div`
  position: relative;
  background: ${({ theme }) => theme.cloud};
  padding: 0 1rem;
  margin-top: calc(-${({ theme }) => theme.navbarHeight} - 3rem);

  @media (min-width: ${({ theme }) => theme.breakpointDesktop}) {
    background: transparent;
    margin-top: 0;
    position: absolute;
    top: 0;
    height: 100%;
    left: 50%;
    width: 50%;
    max-width: ${960 / 2}px;
    padding: 0.75rem;
    display: flex;
    align-items: center;
  }
`;

const DonateFormStyled = styled(DonateForm)`
  margin: auto;
`;

const HeroStyled = styled.div`
  position: relative;
  top: -${({ theme }) => theme.navbarHeight};
  height: calc(100vh - 6rem);

  @media (min-width: ${({ theme }) => theme.breakpointTablet}) {
    min-height: 600px;
  }

  @media (min-width: ${({ theme }) => theme.breakpointDesktop}) {
    top: 0;
    height: calc(100vh - ${({ theme }) => theme.navbarHeight});
  }
`;

const HeroBackgroundImageStyled = styled(BackgroundImage)`
  width: 100%;
  height: 100%;
`;

const SectionWrapperStyled = styled.div`
  padding-top: ${({ theme }) => theme.navbarHeight};
  height: calc(100% - 3rem);
  display: flex;
  align-items: center;

  @media (min-width: ${({ theme }) => theme.breakpointDesktop}) {
    height: 100%;
    padding-top: 0;
  }
`;

const SectionStyled = styled.div`
  width: 100%;
`;

const TitleStyled = styled(Markdown)`
  color: ${({ theme }) => theme.white};
  font-weight: 900;
  font-size: 1.7rem;
  line-height: 1.9rem;

  @media (min-width: ${({ theme }) => theme.breakpointTablet}) {
    font-size: 2.7rem;
    line-height: 3rem;
    max-width: 75%;
  }

  @media (min-width: ${({ theme }) => theme.breakpointDesktop}) {
    max-width: 100%;
    font-size: 2.8rem;
    line-height: 3.2rem;
  }
`;

const SubtitleStyled = styled.div`
  color: ${props => props.theme.white};
  font-size: 1rem;
  line-height: 1.1rem;
  margin-bottom: 0.5rem;

  @media (min-width: ${({ theme }) => theme.breakpointTablet}) {
    font-size: 1.3rem;
    line-height: 1.5rem;
    margin-bottom: 1rem;
  }
`;

const Hero = ({ image, title, subtitle, stats }) => {
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
    <StatusProvider {...stats}>
      <ContainerStyled ref={ref}>
        <HeroStyled>
          <HeroBackgroundImageStyled image={image} loading="eager">
            <SectionWrapperStyled>
              <SectionStyled className="section">
                <div className="container">
                  <div className="columns is-mobile is-marginless">
                    <div className="column is-full-tablet is-half-desktop">
                      <SubtitleStyled>{subtitle}</SubtitleStyled>
                      <TitleStyled>{title}</TitleStyled>
                    </div>
                  </div>
                </div>
              </SectionStyled>
            </SectionWrapperStyled>
          </HeroBackgroundImageStyled>
        </HeroStyled>
        <DonateFormWrapperStyled>
          <DonateFormStyled />
        </DonateFormWrapperStyled>
      </ContainerStyled>
    </StatusProvider>
  );
};

Hero.propTypes = {
  image: PropTypes.shape({
    childImageSharp: PropTypes.shape({
      fluid: PropTypes.shape({}).isRequired,
    }).isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  button: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
  stats: PropTypes.shape({
    amount: PropTypes.number.isRequired,
    contributors: PropTypes.number.isRequired,
  }).isRequired,
};

export default function HeroWrapper(props) {
  return (
    <StaticQuery
      query={graphql`
        query {
          page: yaml(fields: { name: { eq: "page-crowdfunding" } }) {
            hero {
              image {
                childImageSharp {
                  fluid(maxWidth: 1500) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
              title
              subtitle
              button {
                title
              }
            }
          }
          stats: laBaseApiStatsCrowdfunding {
            amount
            contributors
          }
        }
      `}
      render={data => (
        <Hero {...data.page.hero} stats={data.stats} {...props} />
      )}
    />
  );
}
