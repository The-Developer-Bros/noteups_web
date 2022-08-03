import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import { clearFrontEndCookies } from "../../utils";
import {
  subdomainDetailsReducer,
  subdomainListReducer,
  subjectDetailsReducer,
  subjectListReducer
} from "../reducers/ProductReducers";
import authReducer from "../slices/AuthSlice";
import cartRedcuer from "../slices/CartSlice";
import subdomainReducer from "../slices/SubdomainSlice";
import { authApi } from "./api/authApi";

// import monitorReducersEnhancer from './enhancers/monitorReducers'
// import loggerMiddleware from './middleware/logger'

const reducers = {
  subdomains: subdomainReducer,
  subdomainDetails: subdomainDetailsReducer,
  subdomainList: subdomainListReducer,
  subjectDetails: subjectDetailsReducer,
  subjectList: subjectListReducer,
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
  cart: cartRedcuer,
};

const initialState = {
  subdomains: {
    engineering: {},
    arts: {},
    commerce: {},
    selectedSubject: {},
  },
  subdomainDetails: {
    loading: true,
    subdomain: {},
  },
  subdomainList: {
    loading: true,
    subdomains: {},
  },
  subjectDetails: {
    loading: true,
    subject: {},
  },
  subjectList: {
    loading: true,
    subjects: {},
  },
  // initial state for auth is complex, so we'll use a reducer
  // cart
  cart: {
    cartItems: [],
    itemCount: 0,
    total: 0,
  },
};

const persistConfig = {
  key: "root",
  storage,
};

// const composedEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const appReducer = combineReducers(reducers);

const rootReducer = (state, action) => {
  if (action.type === "auth/defaultState") {
    // localStorage.removeItem("persist:root");
    localStorage.clear();
    sessionStorage.clear();

    console.log("cleared local storage", localStorage);
    console.log("cleared session storage", sessionStorage);
    clearFrontEndCookies();
    console.log("cleared front end cookies", document.cookie);
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer
  // composedEnhancers
);

const store = configureStore({
  reducer: persistedReducer,
  // middleware: [loggerMiddleware, ...getDefaultMiddleware()],
  middleware: [thunk],
  devTools: process.env.NODE_ENV !== "production",
  initalState: initialState,
  // enhancers: [monitorReducersEnhancer],
});

//   if (process.env.NODE_ENV !== "production" && module.hot) {
//     module.hot.accept("./reducers", () => store.replaceReducer(rootReducer));
//   }
export default store;
