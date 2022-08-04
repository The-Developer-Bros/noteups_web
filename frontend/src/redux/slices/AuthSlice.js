import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: {
    name: "",
    picture: "",
  },
  _id: "",
  isUserVerified: false,
  verifyToken: null,
  token: null,
  tokens: [],
  stripeCustomerId: "",
  subscriptions: [],
  name: "",
  email: "",
  googleId: "",
  __v: 0,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.profile = action.payload.profile || {};
      state._id = action.payload._id || "";
      state.isUserVerified = action.payload.isUserVerified || false;
      state.verifyToken = action.payload.verifyToken || null;
      state.token = action.payload.token || null;
      state.tokens = action.payload.tokens || [];
      state.stripeCustomerId = action.payload.stripeCustomerId || "";
      state.subscriptions = action.payload.subscriptions || [];
      state.name = action.payload.name || "";
      state.email = action.payload.email || "";
      state.googleId = action.payload.googleId || "";
      state.__v = action.payload.__v || 0;
    },
    defaultState: (state) => {
      // state = action.payload; // this has been done in the appReducer
      state = initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, defaultState } = authSlice.actions;
export default authSlice.reducer;
