import React, { useState } from 'react';
import PropTypes from 'prop-types';

const initialState:any = {};
const initialFunction:any = () => {};
const PrivacyContext = React.createContext([initialState, initialFunction]);

const PrivacyProvider = (props: { children: any; }) => {
  const [state, setState] = useState({
    name: 'Privacy',
    privacyData: []
  });

  const { children } = props;
  return (
    <PrivacyContext.Provider value={[state, setState]}>
      {children}
    </PrivacyContext.Provider>
  );
};

PrivacyProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export { PrivacyContext, PrivacyProvider };
