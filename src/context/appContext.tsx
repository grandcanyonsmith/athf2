import React, { useState } from 'react';
import PropTypes from 'prop-types';

const initialState:any = {};
const initialFunction:any = () => {};
const AppContext = React.createContext([initialState, initialFunction]);

const AppProvider = (props: { children: any; }) => {
  const [state, setState] = useState({
    name: 'Login',
    isLoggedIn: false,
    isLoading: false,
    toast: {},
    companyData: {},
    headerHeight: '30px'
  });

  const { children } = props;
  return (
    <AppContext.Provider value={[state, setState]}>
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export { AppContext, AppProvider };
