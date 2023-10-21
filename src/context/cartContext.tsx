import React, { useState } from 'react';
import PropTypes from 'prop-types';

const initialState:any = {};
const initialFunction:any = () => {};
const CartContext = React.createContext([initialState, initialFunction]);

const CartProvider = (props: { children: any; }) => {
  const [state, setState] = useState({
    name: 'Cart',
    cartData: []
  });

  const { children } = props;
  return (
    <CartContext.Provider value={[state, setState]}>
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export { CartContext, CartProvider };
