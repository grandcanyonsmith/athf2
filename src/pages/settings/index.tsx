import React from 'react';
import SettingsBody from './Settings';
import { SettingsProvider } from '../../context/settingsContext';

const Settings = () => {
  return (
    <SettingsProvider>
      <SettingsBody />
    </SettingsProvider>
  );
};

export default Settings;
