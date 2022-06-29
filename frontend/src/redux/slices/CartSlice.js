import { createSlice } from "@reduxjs/toolkit";

export const storeCartItems = (cartItems) => {
  const cart = cartItems.length > 0 ? cartItems : [];
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const sumItems = (cartItems) => {
  storeCartItems(cartItems); // very frequent operation
  return {
    itemCount: cartItems.reduce((total, prod) => total + prod.quantity, 0),
    total: cartItems.reduce(
      (total, prod) => total + prod.subject_meta_data.price.toString().split(" ")[1] * prod.quantity,
      0
    ),
  };
};

export const cartFromStorage = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

export const isInCart = (product, cartItems) => {
  return cartItems.find((item) => item.public_id === product.public_id);
};

export const initialCartState = {
  cartItems: cartFromStorage,
  ...sumItems(cartFromStorage),
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addProduct: (state, action) => {
      if (
        !state.cartItems.find(
          (item) => item.public_id === action.payload.public_id
        )
      ) {
        state.cartItems.push({
          ...action.payload,
          quantity: 1,
        });
      }

      // update the state
      state.itemCount = sumItems(state.cartItems).itemCount;
      state.total = sumItems(state.cartItems).total;
    },
    increase: (state, action) => {
      const increaseIndex = state.cartItems.findIndex(
        (item) => item.public_id === action.payload.public_id
      );
      state.cartItems[increaseIndex].quantity++;

      // update the state
      state.itemCount = sumItems(state.cartItems).itemCount;
      state.total = sumItems(state.cartItems).total;
    },
    decrease: (state, action) => {
      const decreaseIndex = state.cartItems.findIndex(
        (item) => item.public_id === action.payload.public_id
      );
      const product = state.cartItems[decreaseIndex];
      if (product.quantity > 1) {
        product.quantity--;
      }
      // update the state
      state.itemCount = sumItems(state.cartItems).itemCount;
      state.total = sumItems(state.cartItems).total;
    },
    removeProduct: (state, action) => {
      const newCartItems = state.cartItems.filter(
        (item) => item.public_id !== action.payload.public_id
      );

      // update state
      state.cartItems = [...newCartItems];
      state.itemCount = sumItems(newCartItems).itemCount;
      state.total = sumItems(newCartItems).total;
    },
    clearCart: (state) => {
      localStorage.removeItem("cart");

      // reset state
      state.cartItems = [];
      state.itemCount = 0;
      state.total = 0;
    },
  },
  extraReducers: {},
});

export const { addProduct, increase, decrease, removeProduct, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
