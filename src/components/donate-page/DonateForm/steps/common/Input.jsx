import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const InputStyled = styled.input`
  transition: all 0.2s ease;
  box-shadow: none !important;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.black};
  border-left: 0 solid #db4a39;
  background: transparent;

  &:focus,
  &:hover {
    border-color: ${({ theme }) => theme.black};
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
