import React, { useState } from 'react';
import PropTypes from 'prop-types';

const initialState:any = {
  isPasswordHide: true,
  userData: {
    email: '',
    password: ''
  },
  forgotEmail: ''
};
const initialFunction:any = () => {};

const LoginContext = React.createContext([initialState, initialFunction]);

const LoginProvider = (props: { children: any; }) => {
  const [state, setState] = useState(initialState);

  const { children } = props;
  return (
    <LoginContext.Provider value={[state, setState]}>
      {children}
    </LoginContext.Provider>
  );
};

LoginProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export { LoginContext, LoginProvider };
