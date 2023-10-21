import React, { useState } from 'react';
import PropTypes from 'prop-types';

const initialState:any = {
  isDisplayGrocerySync: false,
  groceryList: [],
  recipes: [],
  notes: ''
};
const initialFunction:any = () => {};

const GroceryContext = React.createContext([initialState, initialFunction]);

const GroceryProvider = (props: { children: any; }) => {
  const [state, setState] = useState(initialState);

  const { children } = props;
  return (
    <GroceryContext.Provider value={[state, setState]}>
      {children}
    </GroceryContext.Provider>
  );
};

GroceryProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export { GroceryContext, GroceryProvider };
