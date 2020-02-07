import styled from 'styled-components';

const SectionSubtitleStyled = styled.h3`
  font-weight: bold;
  margin-bottom: 2rem;
  font-size: 1.2rem;
  line-height: 1.5rem;

  @media (min-width: ${({ theme }) => theme.breakpointTablet}) {
    font-size: 1.4rem;
    line-height: 1.9rem;
  }
`;

export default SectionSubtitleStyled;
