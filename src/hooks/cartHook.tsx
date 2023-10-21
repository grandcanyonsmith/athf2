import { useContext } from 'react';
import AppHook from './appHook';
import { getApi } from '../actions/http';
import Constants from '../constants/appConstants';
import Method from '../constants/methodConstants';
import { getTypePlatform, isSuccess } from '../actions/common';
import { CartContext } from '../context/cartContext';

const CartHook = () => {
    const [state, setState] = useContext(CartContext);
    const { onHandleToast } = AppHook();

    async function getCartData() {
        const url = `${Constants.baseUrl}${Method.getgrocerylist}?selected=true`;
        const response = await getApi(url);
        if (isSuccess(response)) {
            const { data } = response;
            const resultant:any = data.allFoods;
            setState((stateObj:any) => ({
                ...stateObj,
                cartData: resultant,
              }));
        }

    }

    function onCart(props:any) {
        props.history.push('/page/cart');
    }

    return {
        cartData: state.cartData,
        onCart,
        getCartData
    }
};

export default CartHook;
