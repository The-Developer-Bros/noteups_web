import { createSlice } from "@reduxjs/toolkit";

export const storeCartItems = (cartItems) => {
  const cart = cartItems.length > 0 ? cartItems : [];
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const sumItems = (cartItems) => {
  storeCartItems(cartItems); // very frequent operation
  return {
    itemCount: cartItems.reduce(
      (total, product) => total + product.quantity,
      0
    ),
    total: cartItems.reduce((total, product) => {
      return (
        total +
        product.subjectDetails.subject_meta_data.price
          .toString()
          .split(" ")[1] *
          product.quantity
      );
    }, 0),
  };
};

export const cartFromStorage = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

// export const isInCart = (product, cartItems) => {
//   return cartItems.find(
//     (item) => item.subjectDetails.public_id === product.public_id
//   );
// };

// If the product in the cart/mongoDB has standard pricing
// the user cannot add the premium pricing to the cart

// If the product in the cart/mongoDB has premium pricing
// the user cannot add the standard pricing to the cart

// If the product in the cart/mongoDB has monthly pricing
// the user cannot add the yearly pricing to the cart

// If the product in the cart/mongoDB has yearly pricing
// the user cannot add the monthly pricing to the cart

// If any of the 2 (packageType/billingCycle) is different return error.

export const isInCart = (
  cartItems,
  { subjectDetails, packageType, billingCycle }
) => {
  // return cartItems.find(
  //   (item) =>
  //     item.subjectDetails.public_id === subjectDetails.public_id &&
  //     item.packageType === packageType &&
  //     item.billingCycle === billingCycle
  // );
  const itemFound = cartItems.find(
    (item) => item.subjectDetails.public_id === subjectDetails.public_id
  );

  if (itemFound) {
    if (
      itemFound.packageType !== packageType &&
      itemFound.billingCycle !== billingCycle
    ) {
      return {
        error: true,
        message:
          "Both Package Type and Billing Cycle must be same for the same product",
      };
    } else if (itemFound.packageType !== packageType) {
      return {
        error: true,
        message: "You cannot add a different package type to the cart",
      };
    } else if (itemFound.billingCycle !== billingCycle) {
      return {
        error: true,
        message: "You cannot add a different billing cycle to the cart",
      };
    } else {
      return {
        error: false,
        message: "Item already in cart",
      };
    }
  } else {
    return {
      error: false,
      message: "Item not in cart",
    };
  }
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
      const { subjectDetails, packageType, billingCycle, productStripeId } =
        action.payload;

      const { error, message } = isInCart(state.cartItems, {
        subjectDetails,
        packageType,
        billingCycle,
      });

      if (error) {
        return {
          ...state,
          error: true,
          message,
        };
      }

      state.cartItems.push({
        subjectDetails,
        packageType,
        billingCycle,
        productStripeId,
        quantity: 1,
      });

      // update the state
      state.itemCount = sumItems(state.cartItems).itemCount;
      state.total = sumItems(state.cartItems).total;

      // if (
      //   !state.cartItems.find(
      //     (item) => item.subjectDetails.public_id === action.payload.public_id
      //   )
      // ) {
      //   state.cartItems.push({
      //     ...action.payload,
      //     quantity: 1,
      //   });
      // }

      // update the state
      // state.itemCount = sumItems(state.cartItems).itemCount;
      // state.total = sumItems(state.cartItems).total;
    },
    increase: (state, action) => {
      const { subjectDetails, packageType, billingCycle, productStripeId } =
        action.payload;

      const { error, message } = isInCart(state.cartItems, {
        subjectDetails,
        packageType,
        billingCycle,
      });

      if (error) {
        return {
          ...state,
          error: true,
          message,
        };
      }

      const itemFound = state.cartItems.find(
        (item) => item.subjectDetails.public_id === subjectDetails.public_id
      );

      if (itemFound) {
        itemFound.quantity += 1;
      }

      // update the state
      state.itemCount = sumItems(state.cartItems).itemCount;
      state.total = sumItems(state.cartItems).total;

      // const increaseIndex = state.cartItems.findIndex(
      //   (item) =>
      //     item.subjectDetails.public_id ===
      //     action.payload.subjectDetails.public_id
      // );
      // state.cartItems[increaseIndex].quantity++;

      // // update the state
      // state.itemCount = sumItems(state.cartItems).itemCount;
      // state.total = sumItems(state.cartItems).total;
    },
    decrease: (state, action) => {
      const { subjectDetails, packageType, billingCycle, productStripeId } =
        action.payload;

      const { error, message } = isInCart(state.cartItems, {
        subjectDetails,
        packageType,
        billingCycle,
      });

      if (error) {
        return {
          ...state,
          error: true,
          message,
        };
      }

      const itemFound = state.cartItems.find(
        (item) => item.subjectDetails.public_id === subjectDetails.public_id
      );

      if (itemFound) {
        if (itemFound.quantity > 1) {
          itemFound.quantity -= 1;
        }
        // else {
        //   state.cartItems.splice(
        //     state.cartItems.indexOf(itemFound),
        //     1
        //   );
        // }
      }

      // update the state
      state.itemCount = sumItems(state.cartItems).itemCount;
      state.total = sumItems(state.cartItems).total;

      // const decreaseIndex = state.cartItems.findIndex(
      //   (item) => item.public_id === action.payload.public_id
      // );
      // const product = state.cartItems[decreaseIndex];
      // if (product.quantity > 1) {
      //   product.quantity--;
      // }
      // // update the state
      // state.itemCount = sumItems(state.cartItems).itemCount;
      // state.total = sumItems(state.cartItems).total;
    },
    removeProduct: (state, action) => {
      const { subjectDetails, packageType, billingCycle, productStripeId } =
        action.payload;

      const { error, message } = isInCart(state.cartItems, {
        subjectDetails,
        packageType,
        billingCycle,
      });

      if (error) {
        return {
          ...state,
          error: true,
          message,
        };
      }

      const itemFound = state.cartItems.find(
        (item) => item.subjectDetails.public_id === subjectDetails.public_id
      );

      if (itemFound) {
        state.cartItems.splice(state.cartItems.indexOf(itemFound), 1);
      }

      // update the state
      state.itemCount = sumItems(state.cartItems).itemCount;
      state.total = sumItems(state.cartItems).total;

      // const newCartItems = state.cartItems.filter(
      //   (item) => item.public_id !== action.payload.public_id
      // );

      // // update state
      // state.cartItems = [...newCartItems];
      // state.itemCount = sumItems(newCartItems).itemCount;
      // state.total = sumItems(newCartItems).total;
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
