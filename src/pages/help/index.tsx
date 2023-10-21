import React from 'react';
import HelpBody from './help';
import { HelpProvider } from '../../context/helpContext';

const Help = (props:any) => {
  return (
    <HelpProvider>
      <HelpBody {...props} />
    </HelpProvider>
  );
};

export default Help;

