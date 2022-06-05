// import React, { createContext, useReducer } from "react";
// import cartReducer, { sumItems } from "./cart-reducer";

// export const CartContext = createContext();

// const cartFromStorage = localStorage.getItem("cart")
//   ? JSON.parse(localStorage.getItem("cart"))
//   : [];

// const initialState = {
//   cartItems: cartFromStorage,
//   ...sumItems(cartFromStorage),
// };

// const CartContextProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(cartReducer, initialState);
//   const addProduct = (product) =>
//     dispatch({ type: "ADD_ITEM", payload: product });
//   const increase = (product) =>
//     dispatch({ type: "INCREASE", payload: product });
//   const decrease = (product) =>
//     dispatch({ type: "DECREASE", payload: product });
//   const removeProduct = (product) =>
//     dispatch({ type: "REMOVE_ITEM", payload: product });
//   const clearCart = () => dispatch({ type: "CLEAR" });

//   const contextValues = {
//     ...state,
//     addProduct,
//     increase,
//     decrease,
//     removeProduct,
//     clearCart,
//   };

//   return (
//     <CartContext.Provider value={contextValues}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export default CartContextProvider;

// const storeCartItems = (cartItems) => {
//     const cart = cartItems.length > 0 ? cartItems : [];
//     localStorage.setItem("cart", JSON.stringify(cart));
//   };

//   export const sumItems = (cartItems) => {
//     storeCartItems(cartItems); // very frequent operation
//     return {
//       itemCount: cartItems.reduce((total, prod) => total + prod.quantity, 0),
//       total: cartItems.reduce(
//         (total, prod) => total + prod.price * prod.quantity,
//         0
//       ),
//     };
//   };

//   const cartReducer = (state, action) => {
//     switch (action.type) {
//       case "ADD_ITEM":
//         // check if item is in cart
//         if (!state.cartItems.find((item) => item.id === action.payload.id)) {
//           state.cartItems.push({
//             ...action.payload,
//             quantity: 1,
//           });
//         }

//         return {
//           ...state,
//           cartItems: [...state.cartItems],
//           ...sumItems(state.cartItems),
//         };
//       case "INCREASE":
//         const increaseIndex = state.cartItems.findIndex(
//           (item) => item.id === action.payload.id
//         );
//         state.cartItems[increaseIndex].quantity++;

//         return {
//           ...state,
//           cartItems: [...state.cartItems],
//           ...sumItems(state.cartItems),
//         };
//       case "DECREASE":
//         const decreaseIndex = state.cartItems.findIndex(
//           (item) => item.id === action.payload.id
//         );
//         const product = state.cartItems[decreaseIndex];
//         if (product.quantity > 1) {
//           product.quantity--;
//         }

//         return {
//           ...state,
//           cartItems: [...state.cartItems],
//           ...sumItems(state.cartItems),
//         };
//       case "REMOVE_ITEM":
//         const newCartItems = state.cartItems.filter(
//           (item) => item.id !== action.payload.id
//         );
//         return {
//           ...state,
//           cartItems: [...newCartItems],
//           ...sumItems(newCartItems),
//         };
//       case "CLEAR":
//         localStorage.removeItem("cart");
//         return {
//           cartItems: [],
//           itemCount: 0,
//           total: 0,
//         };
//       default:
//         return state;
//     }
//   };

//   export default cartReducer;

import { createSlice } from "@reduxjs/toolkit";

const storeCartItems = (cartItems) => {
  const cart = cartItems.length > 0 ? cartItems : [];
  localStorage.setItem("cart", JSON.stringify(cart));
};

const sumItems = (cartItems) => {
  storeCartItems(cartItems); // very frequent operation
  return {
    itemCount: cartItems.reduce((total, prod) => total + prod.quantity, 0),
    total: cartItems.reduce(
      (total, prod) => total + prod.price * prod.quantity,
      0
    ),
  };
};

const cartFromStorage = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

const initialState = {
  cartItems: cartFromStorage,
  ...sumItems(cartFromStorage),
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      // check if item is in cart
      if (!state.cartItems.find((item) => item.id === action.payload.id)) {
        state.cartItems.push({
          ...action.payload,
          quantity: 1,
        });
      }

      return {
        ...state,
        cartItems: [...state.cartItems],
        ...sumItems(state.cartItems),
      };
    },
    increase: (state, action) => {
      const increaseIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      state.cartItems[increaseIndex].quantity++;

      return {
        ...state,
        cartItems: [...state.cartItems],
        ...sumItems(state.cartItems),
      };
    },
    decrease: (state, action) => {
      const decreaseIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      const product = state.cartItems[decreaseIndex];
      if (product.quantity > 1) {
        product.quantity--;
      }

      return {
        ...state,
        cartItems: [...state.cartItems],
        ...sumItems(state.cartItems),
      };
    },
    removeProduct: (state, action) => {
      const newCartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      return {
        ...state,
        cartItems: [...newCartItems],
        ...sumItems(newCartItems),
      };
    },
    clearCart: (state) => {
      localStorage.removeItem("cart");
      return {
        cartItems: [],
        itemCount: 0,
        total: 0,
      };
    },
  },
  extraReducers: {},
});

export const { addProduct, increase, decrease, removeProduct, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;