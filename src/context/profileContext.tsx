import React, { useState } from 'react';
import PropTypes from 'prop-types';

const initialState:any = {
    profileData: {},
    name: 'Profile',
    isFirstSlide: true,
    isDisplaySelect: false,
    profilePic: '/assets/avatar.png',
    statesList: []
};
const initialFunction:any = () => {};
const ProfileContext = React.createContext([initialState, initialFunction]);

const ProfileProvider = (props: { children: any; }) => {
  const [state, setState] = useState(initialState);

  const { children } = props;
  return (
    <ProfileContext.Provider value={[state, setState]}>
      {children}
    </ProfileContext.Provider>
  );
};

ProfileProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export { ProfileContext, ProfileProvider };
