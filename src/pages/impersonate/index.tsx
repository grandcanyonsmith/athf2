import React from 'react';
import ImpersonateBody from './Impersonate';
import { ImpersonateProvider } from '../../context/impersonateContext';

const Impersonate = (props:any) => {
  return (
    <ImpersonateProvider>
      <ImpersonateBody {...props}/>
    </ImpersonateProvider>
  );
};

export default Impersonate;
