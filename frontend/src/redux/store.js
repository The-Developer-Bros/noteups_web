import { createStore } from '@reduxjs/toolkit';
import { applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import { subdomainDetailsReducer, subdomainListReducer, subjectDetailsReducer, subjectListReducer } from "./reducers/ProductReducers";
import subdomainReducer from './slices/SubdomainSlice';

const reducers = {
    subdomains: subdomainReducer,
    subdomainDetails: subdomainDetailsReducer,
    subdomainList: subdomainListReducer,
    subjectDetails: subjectDetailsReducer,
    subjectList: subjectListReducer
}

const initialState = {
    subdomains: {
        engineering: {},
        arts: {},
        commerce: {},
        selectedSubject: {},
    },
    subdomainDetails: {
        loading: true,
        subdomain: {}
    },
    subdomainList: {
        loading: true,
        subdomains: {}
    },
    subjectDetails: {
        loading: true,
        subject: {}
    },
    subjectList: {
        loading: true,
        subjects: {}
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers(reducers);

export const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk)));
