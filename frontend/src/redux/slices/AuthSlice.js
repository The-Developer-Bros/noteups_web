import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: null,
  email: null,
  googleId: null,
  isUserVerified: false,
  verifyToken: null,
  tokens: [],
  profile: {
    name: null,
    picture: null,
  },
  _id: null,
  __v: 0,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name || null;
      state.email = action.payload.email || null;
      state.googleId = action.payload.googleId || null;
      state.isUserVerified = action.payload.isUserVerified || false;
      state.verifyToken = action.payload.verifyToken || null;
      state.tokens = action.payload.tokens || [];
      state.profile = action.payload.profile || {
        name: null,
        picture: null,
      };
      state._id = action.payload._id || null;
      state.__v = action.payload.__v || 0;
    },
    defaultState: (state) => {
      state = initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, defaultState } = authSlice.actions;
export default authSlice.reducer;
