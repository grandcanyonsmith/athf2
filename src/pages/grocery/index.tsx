import React from 'react';
import GroceryBody from './grocery';
import { GroceryProvider } from '../../context/groceryContext';
import './Grocery.css';

const Login = (props:any) => {
  return (
    <GroceryProvider>
      <GroceryBody {...props} />
    </GroceryProvider>
  );
};

export default Login;
