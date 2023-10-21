import React, { useState } from 'react';
import PropTypes from 'prop-types';

const initialState:any = {};
const initialFunction:any = () => {};
const AppContext = React.createContext([initialState, initialFunction]);

const InitialProvider = (props: { children: any; }) => {
  const [state, setState] = useState({
    name: 'Initial'
  });

  const { children } = props;
  return (
    <AppContext.Provider value={[state, setState]}>
      {children}
    </AppContext.Provider>
  );
};

InitialProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export { AppContext, InitialProvider };
