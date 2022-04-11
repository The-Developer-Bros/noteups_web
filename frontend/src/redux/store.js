import { createStore } from '@reduxjs/toolkit';
import { applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import { subdomainDetailsReducer, subdomainListReducer, subjectDetailsReducer, subjectListReducer } from "./reducers/ProductReducers";
import subdomainReducer from './slices/SubdomainSlice';

const reducers = {
    subdomain: subdomainReducer,
    subdomainDetails: subdomainDetailsReducer,
    subdomainList: subdomainListReducer,
    subjectDetails: subjectDetailsReducer,
    subjectList: subjectListReducer
}


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers(reducers);

const initialState = {
    subdomain: {
        engineering: {},
        arts: {},
        commerce: {},
    },
    subdomainDetails: {
        loading: true,
        subdomain: {}
    },
    subdomainList: {
        loading: true,
        subdomains: {}
    }
}

export const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk)));
