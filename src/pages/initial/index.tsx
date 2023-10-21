import React from 'react';
import InitialBody from './initial';
import { InitialProvider } from '../../context/initialContext';
import './Initial.css';

const Initial = (props:any) => {
  return (
    <InitialProvider>
      <InitialBody {...props} />
    </InitialProvider>
  );
};

export default Initial;
