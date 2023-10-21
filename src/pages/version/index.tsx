import React from 'react';
import FeedbackBody from './version';
import { VersionProvider } from '../../context/versionContext';
import './Version.css';

const Version = (props:any) => {
  return (
    <VersionProvider>
      <FeedbackBody {...props} />
    </VersionProvider>
  );
};

export default Version;
