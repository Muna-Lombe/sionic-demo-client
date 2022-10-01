import React from 'react';
import ReactDOM from 'react-dom';
// import index from "./js/index";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import { fetchProducts } from './js/slices/products/productsSlice';
import { HashRouter } from 'react-router-dom';
import getStore from './js/store';
import { loadCategories, loadProducts, load } from './orm/reducers/rootOrmReducer';
import { getFromDB } from './assets/tests/jsonServer/db';

getStore.reduxStore.dispatch(fetchProducts())
// getStore.reduxStore.dispatch(loadCategories())
let modelsList = ["ProductCategories", "ProductImages", "Products", "ProductVariations", "ProductVariationsProps", "ProductVariationsPropValues", "ProductVariationsPropListValues"]

modelsList.forEach((model)=>{
  getStore.reduxStore.dispatch(load(model))
})
console.log(getStore.reduxStore.getState())
// loadProducts()
ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={getStore.reduxStore}>
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
