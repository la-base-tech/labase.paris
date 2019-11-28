import React from 'react';
import styled from 'styled-components';

const LogoStyled = styled.div`
  font-family: 'CaracasStencilPro';
  cursor: default;
`;

const Logo = props => <LogoStyled {...props}>la base</LogoStyled>;

export default Logo;
