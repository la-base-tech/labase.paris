import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

const NavbarProvider = ({ children }) => {
  const [buttonVisible, setButtonVisibility] = useState(false);

  const showButton = () => {
    setButtonVisibility(true);
  };

  const hideButton = () => {
    setButtonVisibility(false);
  };

  return (
    <Context.Provider
      value={{
        buttonVisible,
        showButton,
        hideButton,
      }}
    >
      {children}
    </Context.Provider>
  );
};

NavbarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NavbarProvider;
