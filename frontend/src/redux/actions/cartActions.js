import * as actionTypes from '../constants/cartConstants';
import axios from 'axios';

export const addToCart = (id, qty) => async (dispatch, getState) => {
    try {
        const { data } = await axios.get(`/api/products/${id}`);

        dispatch({
            type: actionTypes.ADD_TO_CART,
            payload: {
                product: data._id,
                name: data.name,
                imageUrl: data.imageUrl,
                price: data.price,
                countInStock: data.countInStock,
                qty
            }
        });
    } catch (error) {
        console.log(error);
    }
     localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: actionTypes.REMOVE_FROM_CART,
            payload: id
        });
    } catch (error) {
        console.log(error);
    }
     localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
}