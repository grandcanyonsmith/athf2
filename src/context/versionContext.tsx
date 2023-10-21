import React, { useState } from 'react';
import PropTypes from 'prop-types';

const initialState:any = {};
const initialFunction:any = () => {};
const VersionContext = React.createContext([initialState, initialFunction]);

const VersionProvider = (props: { children: any; }) => {
  const [state, setState] = useState({
    name: 'Version',
    versionData: []
  });

  const { children } = props;
  return (
    <VersionContext.Provider value={[state, setState]}>
      {children}
    </VersionContext.Provider>
  );
};

VersionProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export { VersionContext, VersionProvider };
