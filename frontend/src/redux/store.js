import { createStore, configureStore } from '@reduxjs/toolkit';
import { applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import { productDetailsReducer, productListReducer } from "./reducers/ProductReducers";
import subjectsReducer from './slices/SubjectSlice';

const reducers = {
    productList: productListReducer,
    productDetail: productDetailsReducer,
    subjects: subjectsReducer
}


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers(reducers);

const initialState = {
    productList: {
        loading: true,
        products: []
    },
    productDetail: {
        loading: true,
        product: {}
    },
    subjects: {
        loading: true,
        subjects: []
    }
}

export const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk)));
