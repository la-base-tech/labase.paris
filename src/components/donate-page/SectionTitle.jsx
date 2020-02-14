import styled from 'styled-components';

const SectionTitleStyled = styled.h2`
  font-weight: 900;
  margin-bottom: 2rem;
  font-size: 1.5rem;
  line-height: 2rem;

  &.has-subtitle {
    margin-bottom: 1rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpointTablet}) {
    font-size: 2rem;
    line-height: 2.5rem;
  }
`;

export default SectionTitleStyled;
