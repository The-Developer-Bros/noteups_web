import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import {
  subdomainDetailsReducer,
  subdomainListReducer,
  subjectDetailsReducer,
  subjectListReducer,
} from "../reducers/ProductReducers";
import subdomainReducer from "../slices/SubdomainSlice";
import storage from "redux-persist/lib/storage";

// import monitorReducersEnhancer from './enhancers/monitorReducers'
// import loggerMiddleware from './middleware/logger'

const reducers = {
  subdomains: subdomainReducer,
  subdomainDetails: subdomainDetailsReducer,
  subdomainList: subdomainListReducer,
  subjectDetails: subjectDetailsReducer,
  subjectList: subjectListReducer,
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
};

const persistConfig = {
  key: "root",
  storage,
};

// const composedEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers(reducers);
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
