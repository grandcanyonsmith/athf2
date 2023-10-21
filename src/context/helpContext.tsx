import React, { useState } from 'react';
import PropTypes from 'prop-types';

const initialState:any = {};
const initialFunction:any = () => {};
const HelpContext = React.createContext([initialState, initialFunction]);

const HelpProvider = (props: { children: any; }) => {
  const [state, setState] = useState({
    name: 'Help',
    appVersion: '0.0.0'
  });

  const { children } = props;
  return (
    <HelpContext.Provider value={[state, setState]}>
      {children}
    </HelpContext.Provider>
  );
};

HelpProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export { HelpContext, HelpProvider };
