import React from 'react';
import ReactDOM from 'react-dom';
// import index from "./js/index";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createDispatchHook, Provider } from 'react-redux';
import { fetchProducts } from './js/slices/products/productsSlice';
import { HashRouter } from 'react-router-dom';
import Store from './js/store';
import {ThunkTypes} from './orm/actions/thunkTypes';
import { asyncThunk, load, StateLoadMiddleware } from './orm/utilities/StateLoader';
import { stateLoading, stateStatus, STATE_LOADING } from './orm/actions/actionTypes';


// export const cachedProduct = new Cache()

Store.dispatch(fetchProducts())
Store.dispatch(asyncThunk())
// StateLoadMiddleware(Store)
// Store.dispatch(createAsyncThunk(`orm/load${ThunkTypes[0].dataName}`, async () => {
//   return await load(ThunkTypes[0])
//   }))
console.log("store", Store.getState())
// loadProducts()
ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={Store}>
        <App />
      </Provider>
    </HashRouter>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
