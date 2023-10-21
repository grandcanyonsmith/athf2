import React from 'react';
import PrivacyBody from './Privacy';
import { PrivacyProvider } from '../../context/privacyContext';

const Privacy = (props:any) => {
  return (
    <PrivacyProvider>
      <PrivacyBody {...props} />
    </PrivacyProvider>
  );
};

export default Privacy;
