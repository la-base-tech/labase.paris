import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { lighten } from 'polished';

const SUGGESTIONS = [30, 50, 100];

const SuggestionStyled = styled.div`
  background: transparent;
  color: ${({ theme }) => theme.black};
  text-align: center;
  font-size: 1rem;
  font-weight: bold;
  border: 1px solid ${({ theme }) => theme.black};
  padding: 0.6rem 0.4rem;

  &:focus {
    outline: 0;
  }

  &:hover {
    cursor: pointer;
    transition: all 0.2s ease;
    background: ${({ theme }) => lighten(0.2, theme.yellow)};
  }

  &.is-active {
    background: ${({ theme }) => theme.black};
    color: ${({ theme }) => theme.yellow};
  }
`;

const Suggestions = ({ activeValue, onClickValue, ...rest }) => (
  <div {...rest}>
    <div className="columns is-mobile is-1 is-variable">
      {SUGGESTIONS.map((value, index) => (
        <div className="column" key={index}>
          <SuggestionStyled
            className={`${activeValue === value ? 'is-active' : ''}`}
            onClick={() => onClickValue(value)}
          >
            {value} €
          </SuggestionStyled>
        </div>
      ))}
    </div>
  </div>
);

Suggestions.propTypes = {
  activeValue: PropTypes.number,
  onClickValue: PropTypes.func.isRequired,
};

Suggestions.defaultProps = {
  activeValue: null,
};

export default Suggestions;
