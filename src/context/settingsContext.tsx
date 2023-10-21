import React, { useState } from 'react';
import PropTypes from 'prop-types';

const initialState:any = {settingsData: {
    email: '',
    password: '',
    newpassword: ''
},
inputPassword: {
  password: true,
  newpassword: true
}};
const initialFunction:any = () => {};

const SettingsContext = React.createContext([initialState, initialFunction]);

const SettingsProvider = (props: { children: any; }) => {
  const [state, setState] = useState(initialState);

  const { children } = props;
  return (
    <SettingsContext.Provider value={[state, setState]}>
      {children}
    </SettingsContext.Provider>
  );
};

SettingsProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export { SettingsContext, SettingsProvider };
