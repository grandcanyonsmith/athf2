import React from 'react';
import CartBody from './cartBody';
import { CartProvider } from '../../context/cartContext';

const Cart = (props:any) => {
  return (
    <CartProvider>
      <CartBody {...props} />
    </CartProvider>
  );
};

export default Cart;
