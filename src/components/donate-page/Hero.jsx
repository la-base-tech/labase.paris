import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';
import BackgroundImage from '../BackgroundImage';
import { Context as NavbarContext } from '../Navbar';
import Markdown from '../Markdown';
import DonateForm from './DonateForm';

const ContainerStyled = styled.div`
  position: relative;
`;

const HeroStyled = styled.div`
  position: relative;
  min-height: calc(568px - 4.75rem);

  @media (min-width: ${({ theme }) => theme.breakpointDesktop}) {
    min-height: calc(700px - 4.75rem);
    height: calc(100vh - 4.75rem);
    max-height: 750px;
  }
`;

const HeroBackgroundImageStyled = styled(BackgroundImage)`
  width: 100%;
  height: 100%;
`;

const ContentContainerStyled = styled.div`
  height: 100%;
`;

const ColumnsContainerStyled = styled.div`
  @media (min-width: ${({ theme }) => theme.breakpointDesktop}) {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
  }
`;

const ColumnsStyled = styled.div`
  @media (min-width: ${({ theme }) => theme.breakpointDesktop}) {
    display: flex;
    align-items: center;
  }
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

const SubtitleStyled = styled(Markdown)`
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

const DonateFormContainerStyled = styled.div`
  position: relative;
  min-height: 503px;

  @media (min-width: ${({ theme }) => theme.breakpointTablet}) {
    min-height: 504px;
  }

  @media (min-width: ${({ theme }) => theme.breakpointDesktop}) {
    min-height: auto;
  }
`;

const Hero = ({ image, title, subtitle }) => {
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
    <ContainerStyled ref={ref}>
      <HeroStyled>
        <HeroBackgroundImageStyled image={image} loading="eager">
          <ContentContainerStyled className="container">
            <ColumnsContainerStyled>
              <ColumnsStyled className="columns is-marginless is-desktop">
                <div className="column">
                  <div className="section">
                    <div className="container">
                      <SubtitleStyled className="is-hidden-mobile">
                        {subtitle}
                      </SubtitleStyled>
                      <TitleStyled>{title}</TitleStyled>
                    </div>
                  </div>
                </div>
                <div className="column">
                  <DonateFormContainerStyled>
                    <DonateForm />
                  </DonateFormContainerStyled>
                </div>
              </ColumnsStyled>
            </ColumnsContainerStyled>
          </ContentContainerStyled>
        </HeroBackgroundImageStyled>
      </HeroStyled>
    </ContainerStyled>
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
};

export default function HeroWrapper(props) {
  return (
    <StaticQuery
      query={graphql`
        query {
          page: yaml(fields: { name: { eq: "page-donate" } }) {
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
            }
          }
        }
      `}
      render={data => <Hero {...data.page.hero} {...props} />}
    />
  );
}
