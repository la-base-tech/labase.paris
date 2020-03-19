import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { lighten } from 'polished';

const InputStyled = styled.input`
  transition: all 0.2s ease;
  box-shadow: none !important;
  border: none;
  border-left: 0 solid #db4a39;
  background: ${({ theme }) => lighten(0.3, theme.yellow)};
  border-bottom: 1px solid ${({ theme }) => theme.black};

  &::placeholder {
    color: #7e7100;
  }

  &:hover,
  &:focus {
    transition: all 230ms ease;
  }

  &:hover {
    background-color: ${({ theme }) => lighten(0.4, theme.yellow)};
    border-bottom-color: ${({ theme }) => lighten(0.1, theme.black)};
  }

  &:focus {
    background-color: ${({ theme }) => lighten(0.45, theme.yellow)};
    border-bottom-color: ${({ theme }) => lighten(0.2, theme.black)};
  }

  &.has-error {
    border-left-width: 10px;
    border-color: ${({ theme }) => theme.red};

    &::placeholder {
      color: #db4a39 !important;
    }
  }
`;

// eslint-disable-next-line react/display-name
const Input = forwardRef(({ onEnterKeyDown, ...rest }, forwardedRef) => {
  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      onEnterKeyDown();
    }
  };
  return <InputStyled ref={forwardedRef} onKeyDown={handleKeyDown} {...rest} />;
});

Input.propTypes = {
  onEnterKeyDown: PropTypes.func,
};

Input.defaultProps = {
  onEnterKeyDown: () => {},
};

export default Input;
