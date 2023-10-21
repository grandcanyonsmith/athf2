import React, { useState } from 'react';
import PropTypes from 'prop-types';

const initialState:any = {};
const initialFunction:any = () => {};
const ImpersonateContext = React.createContext([initialState, initialFunction]);

const ImpersonateProvider = (props: { children: any; }) => {
  const [state, setState] = useState({
    name: 'Impersonate',
    usersResult: []
  });

  const { children } = props;
  return (
    <ImpersonateContext.Provider value={[state, setState]}>
      {children}
    </ImpersonateContext.Provider>
  );
};

ImpersonateProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export { ImpersonateContext, ImpersonateProvider };
