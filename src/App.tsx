import React from 'react';
import AppBody from './AppBody';
import { AppProvider } from './context/appContext';
import './App.css';

const App = (props:any) => {
  return (
    <AppProvider>
      <AppBody {...props} />
    </AppProvider>
  );
};

export default App;
