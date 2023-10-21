import React from 'react';
import ProfileBody from './Profile';
import { ProfileProvider } from '../../context/profileContext';

const Profile = () => {
  return (
    <ProfileProvider>
      <ProfileBody />
    </ProfileProvider>
  );
};

export default Profile;
