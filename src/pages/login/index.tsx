import React from 'react';
import LoginBody from './Login';
import { LoginProvider } from '../../context/loginContext';

const Login = (props:any) => {
  return (
    <LoginProvider>
      <LoginBody {...props} />
    </LoginProvider>
  );
};

export default Login;
